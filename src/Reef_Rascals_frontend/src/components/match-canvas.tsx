import React, { useEffect, useRef } from 'react';
import { Rascal } from '../types/rascal';
import { User, getInt } from '../types/user';

interface AquariumCanvasProps {
    user1 : User;
    user2 : User;
}

const AquariumCanvas: React.FC<AquariumCanvasProps> = ({ user1, user2 }: AquariumCanvasProps) => {
    let attackRascals = user1.attack;
    let defenseRascals = user1.defense;

    function attack(attack: Rascal, defense: Rascal) {
        defense.health = BigInt(getInt(defense.health) - getInt(attack.attack));
    }

    var i = 0;
    var attacCurr = 0;
    var defenseCurr = 0;
    let animationId: number;

    const battle = () => {
        var attacker = attackRascals[attacCurr];
        var defender = defenseRascals[defenseCurr];
        if(i % getInt(attacker.speed) === 0){
            attack(attacker, defender);
        }

        if(getInt(defender.health) <= 0){
            defenseCurr++;
            if(defenseCurr >= defenseRascals.length){
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
                cancelAnimationFrame(animationId);
                return;
            }
        }

        i++;
        requestAnimationFrame(battle);
    }
};

export default AquariumCanvas;
