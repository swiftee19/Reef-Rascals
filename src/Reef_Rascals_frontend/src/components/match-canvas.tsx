import React, { useEffect, useRef } from 'react';
import { Rascal } from '../types/rascal';
import { User, getInt, saveUser } from '../types/user';
import { BattleHistory } from '../types/battle-history';

interface AquariumCanvasProps {
    user1 : User;
    user2 : User;
}

const AquariumCanvas: React.FC<AquariumCanvasProps> = ({ user1, user2 }: AquariumCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rascalSize = window.innerWidth * 0.06;

    let attackRascals = user1.attack;
    let defenseRascals = user1.defense;

    function attack(attack: Rascal, defense: Rascal) {
        defense.health = BigInt(getInt(defense.health) - getInt(attack.attack));
    }

    var i = 0;
    var attacCurr = 0;
    var defenseCurr = 0;
    let animationId: number;

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

    const battle = () => {
        var attacker = attackRascals[attacCurr];
        var defender = defenseRascals[defenseCurr];
        if(i % getInt(attacker.speed) === 0){
            attack(attacker, defender);
        }

        if(getInt(defender.health) <= 0){
            defenseCurr++;
            if(defenseCurr >= defenseRascals.length){
                reward(user1);
                saveBattle(user1, user2, "Win");
                cancelAnimationFrame(animationId);
                return;
            }
        }

        if(i % getInt(defender.speed) === 0){
            attack(defender, attacker);
        }

        if(getInt(attacker.health) <= 0){
            attacCurr++;
            if(attacCurr >= attackRascals.length){
                saveBattle(user1, user2, "Lose");
                cancelAnimationFrame(animationId);
                return;
            }
        }

        i++;
        requestAnimationFrame(battle);
    }

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0 }} />;
};

export default AquariumCanvas;
