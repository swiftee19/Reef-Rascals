import {Rascal} from "./rascal";
import {User} from "./user";

export enum BattleResult {
    Win = "Win",
    Lose = "Lose"
}

export type BattleHistory = {
    id: string;
    opponent: User;
    result: BattleResult;
    date: Date;
    usedRascal: Rascal[];
    opponentRascal: Rascal[];
}