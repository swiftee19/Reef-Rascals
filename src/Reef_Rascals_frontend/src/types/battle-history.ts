import {Rascal} from "./rascal";
import {User} from "./user";

export enum BattleResult {
    Win = "Win",
    Lose = "Lose"
}

export class BattleHistory {
    id: string;
    opponent: User;
    result: string;
    date: string;
    usedRascal: Rascal[];
    opponentRascal: Rascal[];

    constructor(id: string, opponent: User, result: string, usedRascal: Rascal[], opponentRascal: Rascal[]) {
        this.id = id;
        this.opponent = opponent;
        this.result = result;
        this.date = new Date().toString();
        this.usedRascal = usedRascal;
        this.opponentRascal = opponentRascal;
    }
}