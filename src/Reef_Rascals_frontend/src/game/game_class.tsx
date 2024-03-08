import { Rascal } from "../types/rascal";
import { User, getInt } from "../types/user";
import { getRandomBoolean } from "./game_helper";

export interface MatchCanvasProps {
    player: User;
    opponent: User;
    battleEnd: string | null;
    setBattleEnd: (status: string) => void;
    changeUserHealth: (health: number) => void;
    changeOpponentHealth: (health: number) => void;
    changeUserCurrRascal: (rascal: Rascal) => void;
    changeOpponentCurrRascal: (rascal: Rascal) => void;
}
export interface HealthBarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    maxHealth: number;
    currentHealth: number;
}

export class BattleRascal {
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

        console.log("Attacker", this.rascal.name, "Defender", defender.name, "Damage", finalValue);
        defender.health = BigInt(getInt(defender.health) - finalValue);
        console.log("Defender health", getInt(defender.health));
        return finalValue;
    }
}