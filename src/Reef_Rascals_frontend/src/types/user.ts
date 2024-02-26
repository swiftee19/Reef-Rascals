import {Rascal} from "./rascal";
import {BattleHistory} from "./battle-history";

export enum League {
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
}

export type User = {
    id: string;
    name: string;
    profilePictureUrl: string;
    dateJoined: Date;
    token: number;
    rascals: Rascal[];
    league: League;
    battleHistories: BattleHistory[];
}