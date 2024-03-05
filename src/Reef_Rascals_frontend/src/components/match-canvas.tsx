import React, {useEffect, useRef, useState} from 'react';
import {Rascal} from '../types/rascal';
import {User, getInt, saveUser} from '../types/user';
import { HealthBarProps, MatchCanvasProps, drawBoom, drawDamageText, drawHealthBar, drawRascal, drawRascalWithHealthBar, getRandomBoolean, reward, saveBattle } from '../game/game_helper';
import { BattleRascal } from '../game/game_class';

const MatchCanvas: React.FC<MatchCanvasProps> = ({player, opponent}: MatchCanvasProps) => {
    player.attack = player.rascals;
    opponent.defense = opponent.rascals;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rascalSize = window.innerWidth * 0.06 * 3;
    const boomImageDuration = 200;
    const baseSpeed = 1;
    const entropy = 0.7;

    const startPositions = {
        x_left: window.innerWidth * 0.25 - (rascalSize / 2),
        y_left: window.innerHeight * 0.5 - (rascalSize / 2),
        x_right: window.innerWidth * 0.75 - (rascalSize / 2),
        y_right: window.innerHeight * 0.5 - (rascalSize / 2),
    }
    const attackingRascals: BattleRascal[] = player.attack.map((rascal) => {
        return new BattleRascal(rascal, startPositions.x_left, startPositions.y_left, false, false);
    })
    const defendingRascals: BattleRascal[] = opponent.defense.map((rascal) => {
        return new BattleRascal(rascal, startPositions.x_right, startPositions.y_right, false, false);
    })

    let i = 0;
    let currAtkIdx = 0
    let currDefIdx = 0

    let moveSpeed = baseSpeed
    let clearBoomImage = false;
    let damage = 0

    let attacker = attackingRascals.at(currAtkIdx);
    let defender = defendingRascals.at(currDefIdx);
    let attackerMaxHealth = getInt(attacker!.rascal.health);
    let defenderMaxHealth = getInt(defender!.rascal.health);

    function checkRascalCondition() {
        if (getInt(defender!.rascal.health) <= 0) {
            i = 0
            
            currDefIdx += 1
            if (currDefIdx >= defendingRascals.length) {
                reward(player);
                saveBattle(player, opponent, "Win");
                return;
            }
            defender = defendingRascals.at(currDefIdx);
            defenderMaxHealth = getInt(defender!.rascal.health);
        }
        if (getInt(attacker!.rascal.health) <= 0) {
            i = 0
            currAtkIdx += 1
            if (currAtkIdx >= attackingRascals.length) {
                saveBattle(player, opponent, "Lose");
                return;
            }
            attacker = attackingRascals.at(currAtkIdx);
            attackerMaxHealth = getInt(attacker!.rascal.health);
        }
    }

    function drawRascals(context: CanvasRenderingContext2D, attacker: BattleRascal, defender: BattleRascal) {
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
    }

    function handleAttack(current: BattleRascal, target: BattleRascal) {
        if (current.x + (rascalSize * 0.8) < target.x) {
            moveSpeed += entropy
            current.x += moveSpeed;
        } else if (target.x + (rascalSize * 0.8) < current.x) {
            moveSpeed += entropy
            current.x -= moveSpeed;
        } else {
            setTimeout(
                () => {
                    clearBoomImage = true
                }, boomImageDuration
            )
            moveSpeed = baseSpeed
            current.isAttacking = false
            current.isReturningAfterAttacking = true
            damage = current.attack(target.rascal)
            checkRascalCondition()
        }
    }

    function handleReturn(context: CanvasRenderingContext2D, current: BattleRascal, target: BattleRascal, isAttacker: boolean) {
        const size = isAttacker ? -0.2 * rascalSize : rascalSize
        const boomX = isAttacker ? target.x - (rascalSize / 2) : target.x + (rascalSize / 2)
        if (!clearBoomImage) {
            drawBoom(context, boomX, target.y, rascalSize)
        }
        drawDamageText(context, damage.toString(), target.x + size , target.y - (0.3 * rascalSize))

        if (isAttacker && current.x > startPositions.x_left) {
            moveSpeed = moveSpeed + entropy
            current.x -= moveSpeed;
        } else if (!isAttacker && current.x < startPositions.x_right) {
            moveSpeed = moveSpeed + entropy
            current.x += moveSpeed;
        } else {
            current.isReturningAfterAttacking = false
            moveSpeed = baseSpeed
            clearBoomImage = false
            damage = 0
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
                drawRascals(context, attacker, defender);

                if (attacker.isAttacking || defender.isAttacking || attacker.isReturningAfterAttacking || defender.isReturningAfterAttacking) {
                    i = i
                    if (attacker.isAttacking) {
                        handleAttack(attacker, defender);
                    } else if (attacker.isReturningAfterAttacking) {
                        handleReturn(context, attacker, defender, true);
                    } else if (defender.isAttacking) {
                        handleAttack(defender, attacker);
                    } else if (defender.isReturningAfterAttacking) {
                        handleReturn(context, defender, attacker, false);
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