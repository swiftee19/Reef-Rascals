import {Rascal} from "./rascal";
import {BattleHistory} from "./battle-history";
import { matchmaking } from "../../../declarations/matchmaking";
import { Principal } from "@dfinity/principal";

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
    id: Principal;
    username: string;
    password: string;
    profilePictureUrl: string;
    dateJoined: Date;
    tokens: number;
    rascals: Rascal[];
    defense: Rascal[];
    rank: League;
    battleHistories: BattleHistory[];
    elo: number;

    constructor(id: Principal, username: string, profilePictureUrl: string, dateJoined: Date, tokens: number, rascals: Rascal[], defense: Rascal[], sell: Rascal[], league: League, battleHistories: BattleHistory[], elo: number) {
        this.id = id;
        this.username = username;
        this.password = "";
        this.profilePictureUrl = profilePictureUrl;
        this.dateJoined = dateJoined;
        this.tokens = tokens;
        this.rascals = rascals;
        this.defense = defense;
        this.rank = league;
        this.battleHistories = battleHistories;
        this.elo = elo;
    }

    saveUser() {
        matchmaking.updateUser(this.id, this);
    }

    sellRascal(rascal: Rascal) {
        matchmaking.sellRascal(rascal)
    }

    retrieveRascal(rascal: Rascal) {
        matchmaking.removeFromMarket(rascal)
    }
}