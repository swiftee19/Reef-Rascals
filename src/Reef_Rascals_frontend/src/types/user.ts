import {Rascal} from "./rascal";
import {BattleHistory} from "./battle-history";
import { matchmaking } from "../../../declarations/matchmaking";

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

export class User {
    id: string;
    name: string;
    profilePictureUrl: string;
    dateJoined: Date;
    token: number;
    rascals: Rascal[];
    defense: Rascal[];
    league: League;
    battleHistories: BattleHistory[];
    elo: number;

    constructor(id: string, name: string, profilePictureUrl: string, dateJoined: Date, token: number, rascals: Rascal[], defense: Rascal[], league: League, battleHistories: BattleHistory[], elo: number) {
        this.id = id;
        this.name = name;
        this.profilePictureUrl = profilePictureUrl;
        this.dateJoined = dateJoined;
        this.token = token;
        this.rascals = rascals;
        this.defense = defense;
        this.league = league;
        this.battleHistories = battleHistories;
        this.elo = elo;
    }
}

export function saveUser(user: User) {
    
}