import {Rascal} from "./rascal";
import {BattleHistory} from "./battle-history";

export enum League {
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
}

export enum LeagueThresholdNumber{
    Bronze = 100,
    Silver = 200,
    Gold = 300,
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
    elo: number;
}