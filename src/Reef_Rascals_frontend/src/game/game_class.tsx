import { Rascal } from "../types/rascal";
import { User, getInt } from "../types/user";
import { getRandomBoolean } from "./game_helper";

export interface MatchCanvasProps {
    player: User;
    opponent: User;
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

        defender.health = BigInt(getInt(defender.health) - finalValue);
        return finalValue;
    }
}