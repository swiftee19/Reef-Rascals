import React, {useEffect, useRef} from 'react';
import {Rascal} from '../types/rascal';
import {User, getInt, saveUser} from '../types/user';
import {BattleHistory} from '../types/battle-history';

interface MatchCanvasProps {
    user1: User;
    user2: User;
}

const MatchCanvas: React.FC<MatchCanvasProps> = ({user1, user2}: MatchCanvasProps) => {
    user1.attack = user1.rascals;
    user2.defense = user2.rascals;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rascalSize = window.innerWidth * 0.06;

    let positions: {
        x_left: number;
        y_left: number;
        x_right: number;
        y_right: number;
    }

    let i = 0;
    let attackCurr = 0;
    let defenseCurr = 0;
    let animationId: number;

    let attackRascals = user1.attack;
    let defenseRascals = user2.defense;

    function initializePositions() {
        positions = {
            x_left: window.innerWidth * 0.25 - rascalSize,
            y_left: window.innerHeight * 0.5,
            x_right: window.innerWidth * 0.75 - rascalSize,
            y_right: window.innerHeight * 0.5
        }
    }

    function attack(attack: Rascal, defense: Rascal) {
        defense.health = BigInt(getInt(defense.health) - getInt(attack.attack));
    }

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
        user.battleHistories.push(new BattleHistory(opponent, result, attackRascals, defenseRascals));
        saveUser(user);
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

            let attacker = attackRascals[attackCurr];
            let defender = defenseRascals[defenseCurr];

            const rascalImgAttacker = new Image();
            rascalImgAttacker.src = attacker.imageUrl;
            const rascalImgDefender = new Image();
            rascalImgDefender.src = defender.imageUrl;

            context.save();
            context.drawImage(rascalImgAttacker, positions.x_left, positions.y_left, rascalSize * 2, rascalSize * 2);
            context.restore();

            context.save();
            context.translate(positions.x_right + rascalSize * 2, 0);
            context.scale(-1, 1);
            context.drawImage(rascalImgDefender, 0, positions.y_right, rascalSize * 2, rascalSize * 2);
            context.restore();

            if (i % getInt(attacker.speed) === 0) {
                attack(attacker, defender);
            }

            if (getInt(defender.health) <= 0) {
                defenseCurr++;
                if (defenseCurr >= defenseRascals.length) {
                    reward(user1);
                    saveBattle(user1, user2, "Win");
                    cancelAnimationFrame(animationId);
                    return;
                }
            }

            if (i % getInt(defender.speed) === 0) {
                attack(defender, attacker);
            }

            if (getInt(attacker.health) <= 0) {
                attackCurr++;
                if (attackCurr >= attackRascals.length) {
                    saveBattle(user1, user2, "Lose");
                    cancelAnimationFrame(animationId);
                    return;
                }
            }

            i++;

            window.requestAnimationFrame(animate);
        }
        animate();
    }, []);

    initializePositions();

    return <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0}}/>;
};

export default MatchCanvas;
