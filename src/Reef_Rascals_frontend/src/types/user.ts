import {Rascal} from "./rascal";

export enum League {
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
}

export type User = {
    id: string;
    name: string;
    profilePictureUrl: string;
    registeredAt: Date;
    rascals: Rascal[];
    wins: number;
    league: League;
    battles: number;
    winRate: number;
}