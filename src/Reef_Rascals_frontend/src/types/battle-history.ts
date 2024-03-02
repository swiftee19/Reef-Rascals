import {Rascal} from "./rascal";
import {User} from "./user";
import {v4 as uuidv4} from 'uuid';

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

    constructor(opponent: User, result: string, usedRascal: Rascal[], opponentRascal: Rascal[]) {
        this.id = `#${uuidv4().slice(0, 8).toUpperCase()}`;
        this.opponent = opponent;
        this.result = result;
        this.date = new Date().toString();
        this.usedRascal = usedRascal;
        this.opponentRascal = opponentRascal;
    }
}