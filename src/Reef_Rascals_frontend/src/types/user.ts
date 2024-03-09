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
    profilePictureUrl: string;
    dateJoined: string;
    tokens: number;
    rascals: Rascal[];
    defense: Rascal[];
    attack: Rascal[];
    rank: string;
    battleHistories: BattleHistory[];
    elo: bigint;
    raslet: bigint;
    rascalFragment: bigint;
    lastRasletClaim: string;

    constructor(id: Principal) {
        this.id = id;
        this.username = "Rascals Warrior";
        this.profilePictureUrl = "";
        this.dateJoined = new Date().toString();
        this.tokens = 0;
        this.rascals = [];
        this.defense = [];
        this.attack = [];
        this.rank = League.Bronze;
        this.battleHistories = [];
        this.elo = BigInt(0);
        this.raslet = BigInt(7);
        this.rascalFragment = BigInt(30);
        this.lastRasletClaim = new Date().toString();
    }
}

export function retrieveRascal(rascal: Rascal) {
    matchmaking.removeFromMarket(rascal)
}

export function getElo(user: User) {
    return parseInt(user.elo.toString());
}

export function getInt(x: bigint) {
    return Number(x);
}