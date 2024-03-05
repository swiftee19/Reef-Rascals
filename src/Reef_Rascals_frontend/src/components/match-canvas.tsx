import React, {useEffect, useRef, useState} from 'react';
import {Rascal} from '../types/rascal';
import {User, getInt, saveUser} from '../types/user';
import {BattleHistory} from '../types/battle-history';

interface MatchCanvasProps {
    user1: User;
    user2: User;
}

interface HealthBarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    maxHealth: number;
    currentHealth: number;
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

function drawHealthBar(context: CanvasRenderingContext2D, healthBarProps: HealthBarProps) {
    const {x, y, width, height, maxHealth, currentHealth} = healthBarProps;

    // Draw background
    context.save();
    context.fillStyle = 'gray';
    context.fillRect(x, y, width, height);
    context.restore();

    // Draw health
    context.save();
    context.fillStyle = 'green';
    const healthWidth = ((currentHealth / maxHealth) * width) > 0 ? ((currentHealth / maxHealth) * width) : 0;
    context.fillRect(x, y, healthWidth, height);
    context.restore();
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

function drawRascalWithHealthBar(
    context: CanvasRenderingContext2D,
    rascal: Rascal,
    x: number,
    y: number,
    size: number,
    isFlipped: boolean,
    healthBarProps: HealthBarProps
) {
    // Draw Rascal image
    drawRascal(context, rascal, x, y, size, isFlipped);

    // Draw Health bar
    drawHealthBar(context, healthBarProps);
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
    const boomImageDuration = 200

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
    let currentAttackingRascalIndex = 0
    let currentDefendingRascalIndex = 0
    const baseSpeed = 1;
    const entropy = 0.7;

    let moveSpeed = baseSpeed
    let clearBoomImage = false;
    let damage = 0

    let attacker = attackingRascals.at(currentAttackingRascalIndex);
    let defender = defendingRascals.at(currentDefendingRascalIndex);
    let attackerMaxHealth = getInt(attacker!.rascal.health);
    let defenderMaxHealth = getInt(defender!.rascal.health);

    function drawDamageText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
        context.save();
        context.fillStyle = 'white';
        context.font = '5rem Poppins bold';
        context.fillText(text, x, y);
        context.restore();
    }

    function drawBoom(context: CanvasRenderingContext2D, x: number, y: number, size: number) {
        const boomImg = new Image();
        boomImg.src = "/boom.png";

        context.save();
        context.drawImage(boomImg, x, y, size, size);
        context.restore();
    }

    function checkRascalCondition() {
        if (getInt(defender!.rascal.health) <= 0) {
            i = 0
            currentDefendingRascalIndex += 1

            if (currentDefendingRascalIndex >= defendingRascals.length) {
                reward(user1);
                saveBattle(user1, user2, "Win");
                return;
            }

            defender = defendingRascals.at(currentDefendingRascalIndex);
            defenderMaxHealth = getInt(defender!.rascal.health);
        }

        if (getInt(attacker!.rascal.health) <= 0) {
            i = 0
            currentAttackingRascalIndex += 1
            if (currentAttackingRascalIndex >= attackingRascals.length) {
                saveBattle(user1, user2, "Lose");
                return;
            }

            attacker = attackingRascals.at(currentAttackingRascalIndex);
            attackerMaxHealth = getInt(attacker!.rascal.health);
        }
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
            if (attacker && defender) {
                // Draw attacking and defending Rascals with health bars
                drawRascalWithHealthBar(context, attacker.rascal, attacker.x, attacker.y, rascalSize, false, {
                    x: attacker.x,
                    y: attacker.y + rascalSize + 5,
                    width: rascalSize,
                    height: 10,
                    maxHealth: attackerMaxHealth,
                    currentHealth: getInt(attacker.rascal.health),
                });

                drawRascalWithHealthBar(context, defender.rascal, defender.x, defender.y, rascalSize, true, {
                    x: defender.x,
                    y: defender.y + rascalSize + 5,
                    width: rascalSize,
                    height: 10,
                    maxHealth: defenderMaxHealth,
                    currentHealth: getInt(defender.rascal.health),
                });

                if (attacker.isAttacking || defender.isAttacking || attacker.isReturningAfterAttacking || defender.isReturningAfterAttacking) {
                    i = i

                    if (attacker.isAttacking) {
                        if (attacker.x + (rascalSize * 0.8) < defender.x) {
                            moveSpeed += entropy
                            attacker.x += moveSpeed;
                        } else {
                            setTimeout(
                                () => {
                                    clearBoomImage = true
                                }, boomImageDuration
                            )
                            moveSpeed = baseSpeed
                            attacker.isAttacking = false
                            attacker.isReturningAfterAttacking = true

                            damage = attacker.attack(defender.rascal)
                            checkRascalCondition()
                        }
                    } else if (attacker.isReturningAfterAttacking) {
                        if (!clearBoomImage) {
                            drawBoom(context, defender.x - (rascalSize / 2), defender.y, rascalSize)
                        }
                        drawDamageText(context, damage.toString(), defender.x - (0.2 * rascalSize), defender.y - (0.3 * rascalSize))

                        if (attacker.x > startPositions.x_left) {
                            moveSpeed = moveSpeed + entropy
                            attacker.x -= moveSpeed;
                        } else {
                            attacker.isReturningAfterAttacking = false
                            moveSpeed = baseSpeed
                            clearBoomImage = false
                            damage = 0
                        }
                    } else if (defender.isAttacking) {
                        if (defender.x > attacker.x + (rascalSize * 0.8)) {
                            moveSpeed += entropy
                            defender.x -= moveSpeed;
                        } else {
                            setTimeout(
                                () => {
                                    clearBoomImage = true
                                }, boomImageDuration
                            )
                            moveSpeed = baseSpeed
                            defender.isAttacking = false
                            defender.isReturningAfterAttacking = true

                            damage = defender.attack(attacker.rascal)
                            checkRascalCondition()
                        }
                    } else if (defender.isReturningAfterAttacking) {
                        if (!clearBoomImage) {
                            drawBoom(context, attacker.x + (rascalSize / 2), attacker.y, rascalSize)
                        }
                        drawDamageText(context, damage.toString(), attacker.x + rascalSize, attacker.y - (0.3 * rascalSize))


                        if (defender.x < startPositions.x_right) {
                            moveSpeed = moveSpeed + entropy
                            defender.x += moveSpeed;
                        } else {
                            defender.isReturningAfterAttacking = false
                            moveSpeed = baseSpeed
                            clearBoomImage = false
                            damage = 0
                        }
                    }
                } else {
                    i += 1

                    if (i % (100 - getInt(attacker.rascal.speed)) === 0) {
                        attacker.isAttacking = true;
                    }
                    if (i % (100 - getInt(defender.rascal.speed)) === 0) {
                        defender.isAttacking = true;
                    }
                }
            }

            window.requestAnimationFrame(animate);
        }
        animate();
    }, [canvasRef]);

    return <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0}}/>;
};

export default MatchCanvas;
