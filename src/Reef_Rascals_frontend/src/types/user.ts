import {Rascal} from "./rascal";

export type User = {
    id: string;
    name: string;
    profilePictureUrl: string;
    registeredAt: Date;
    rascals: Rascal[];
    wins: number;
    battles: number;
    winRate: number;
}