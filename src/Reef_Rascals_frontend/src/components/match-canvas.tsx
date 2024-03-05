import React, {useEffect, useRef, useState} from 'react';
import {Rascal} from '../types/rascal';
import {User, getInt, saveUser} from '../types/user';
import {BattleHistory} from '../types/battle-history';

interface MatchCanvasProps {
    user1: User;
    user2: User;
}

const getRandomBoolean = () => Math.random() < 0.5;

function reward(user: User) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber <= 5) {
        user.rascalFragment += BigInt(3);
    } else if (randomNumber <= 25) {
        user.rascalFragment += BigInt(2);
    } else {
        user.rascalFragment += BigInt(1);
    }

    saveUser(user);
}

function saveBattle(user: User, opponent: User, result: string) {
    user.battleHistories.push(new BattleHistory(opponent, result, user.attack, opponent.defense));
    saveUser(user);
}

function drawRascal(context: CanvasRenderingContext2D, rascal: Rascal, x: number, y: number, size: number, isFlipped: boolean) {
    const rascalImg = new Image();
    rascalImg.src = rascal.imageUrl;

    if (!isFlipped) {
        context.save();
        context.drawImage(rascalImg, x, y, size, size);
        context.restore();
    } else {
        context.save();
        context.scale(-1, 1);
        context.drawImage(rascalImg, -x - size, y, size, size);
        context.restore();
    }
}


class BattleRascal {
    rascal: Rascal;
    x: number;
    y: number;
    isAttacking: boolean;
    isReturningAfterAttacking: boolean;

    constructor(rascal: Rascal, x: number, y: number, isAttacking: boolean, isReturningAfterAttacking: boolean) {
        this.rascal = rascal;
        this.x = x;
        this.y = y;
        this.isAttacking = isAttacking;
        this.isReturningAfterAttacking = isReturningAfterAttacking;
    }

    attack = (defender: Rascal) => {
        const deviationSign = getRandomBoolean() ? 1 : -1;
        const deviationValue = Math.random() * 3 * deviationSign;
        const finalValue = getInt(this.rascal.attack) + parseInt(String(deviationValue));

        defender.health = BigInt(getInt(defender.health) - finalValue);

        return finalValue;
    }
}

const MatchCanvas: React.FC<MatchCanvasProps> = ({user1, user2}: MatchCanvasProps) => {

    user1.attack = user1.rascals;
    user2.defense = user2.rascals;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rascalSize = window.innerWidth * 0.06 * 3;

    const startPositions = {
        x_left: window.innerWidth * 0.25 - (rascalSize / 2),
        y_left: window.innerHeight * 0.5 - (rascalSize / 2),
        x_right: window.innerWidth * 0.75 - (rascalSize / 2),
        y_right: window.innerHeight * 0.5 - (rascalSize / 2),
    }

    const attackingRascals: BattleRascal[] = user1.attack.map((rascal, index) => {
        return new BattleRascal(rascal, startPositions.x_left, startPositions.y_left, false, false);
    })
    const defendingRascals: BattleRascal[] = user2.defense.map((rascal, index) => {
        return new BattleRascal(rascal, startPositions.x_right, startPositions.y_right, false, false);
    })

    let i = 0;
    let currentAttackingRascalIndex = 0;
    let currentDefendingRascalIndex = 0;
    const baseSpeed = 1;
    const entropy = 1.1;

    let moveSpeed = baseSpeed

    function drawBoom(context: CanvasRenderingContext2D, x: number, y: number, size: number) {
        const boomImg = new Image();
        boomImg.src = "/boom.png";

        context.save();
        context.drawImage(boomImg, x, y, size, size);
        context.restore();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const animate = () => {

            context.clearRect(0, 0, canvas.width, canvas.height);
            let attacker = attackingRascals[currentAttackingRascalIndex];
            let defender = defendingRascals[currentDefendingRascalIndex];

            drawRascal(context, attacker.rascal, attacker.x, attacker.y, rascalSize, false);
            drawRascal(context, defender.rascal, defender.x, defender.y, rascalSize, true);

            if (attacker.isAttacking || defender.isAttacking || attacker.isReturningAfterAttacking || defender.isReturningAfterAttacking) {
                i = i

                if (attacker.isAttacking) {
                    if (attacker.x + (rascalSize * 0.8) < defender.x) {
                        moveSpeed += entropy
                        attacker.x += moveSpeed;
                    } else {
                        drawBoom(context, defender.x, defender.y, rascalSize)
                        moveSpeed = baseSpeed
                        attacker.isAttacking = false
                        attacker.isReturningAfterAttacking = true
                    }
                } else if (attacker.isReturningAfterAttacking) {
                    if (attacker.x > startPositions.x_left) {
                        moveSpeed = moveSpeed + entropy
                        attacker.x -= moveSpeed;
                    } else {
                        attacker.isReturningAfterAttacking = false
                        moveSpeed = baseSpeed
                    }
                } else if (defender.isAttacking) {
                    if (defender.x > attacker.x + (rascalSize * 0.8)) {
                        moveSpeed += entropy
                        defender.x -= moveSpeed;
                    } else {
                        drawBoom(context, attacker.x, attacker.y, rascalSize)
                        moveSpeed = baseSpeed
                        defender.isAttacking = false
                        defender.isReturningAfterAttacking = true
                    }
                } else if (defender.isReturningAfterAttacking) {
                    if (defender.x < startPositions.x_right) {
                        moveSpeed = moveSpeed + entropy
                        defender.x += moveSpeed;
                    } else {
                        defender.isReturningAfterAttacking = false
                        moveSpeed = baseSpeed
                    }
                }
            } else {
                i += 1

                if (i % getInt(attacker.rascal.speed) === 0) {
                    attacker.isAttacking = true;
                }
                if (i % getInt(defender.rascal.speed) === 0) {
                    defender.isAttacking = true;
                }
            }


            // if (i % getInt(attacker.speed) === 0) {
            //     const attackValue = attack(attacker, defender);
            //
            //     // Display the attack number
            //     context.save();
            //     context.fillStyle = 'red';
            //     context.font = '3rem Poppins bold';
            //     context.fillText(`Attack: ${attackValue}`, positions.x_left, positions.y_left - 10);
            //     context.restore();
            // }
            //
            // if (getInt(defender.health) <= 0) {
            //     defenseCurr++;
            //     if (defenseCurr >= defenseRascals.length) {
            //         reward(user1);
            //         saveBattle(user1, user2, "Win");
            //         return;
            //     }
            // }
            //
            // if (i % getInt(defender.speed) === 0) {
            //     const attackValue = attack(defender, attacker);
            //
            //     // Display the attack number
            //     context.save();
            //     context.fillStyle = 'red';
            //     context.font = '3rem Poppins bold';
            //     context.fillText(`Attack: ${attackValue}`, positions.x_right, positions.y_right - 10);
            //     context.restore();
            // }
            //
            // if (getInt(attacker.health) <= 0) {
            //     attackCurr++;
            //     if (attackCurr >= attackRascals.length) {
            //         saveBattle(user1, user2, "Lose");
            //         return;
            //     }
            // }
            //
            // i++;
            //
            window.requestAnimationFrame(animate);
        }
        animate();
    }, [canvasRef, attackingRascals, defendingRascals, rascalSize, user1, user2]);

    return <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0}}/>;
};

export default MatchCanvas;
