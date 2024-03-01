import {Rascal} from "./rascal";
import {User} from "./user";

export enum BattleResult {
    Win = "Win",
    Lose = "Lose"
}

export type BattleHistory = {
    id: string;
    opponent: User;
    result: string;
    date: string;
    usedRascal: Rascal[];
    opponentRascal: Rascal[];
}