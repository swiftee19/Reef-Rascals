import {Rascal} from "./rascal";
import {BattleHistory} from "./battle-history";
import { matchmaking } from "../../../declarations/matchmaking";
import { Principal } from "@dfinity/principal";
import rascalList, { CommonRascal, epicRascal, legendRascal, rareRascal } from "./rascals";

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
    dateJoined: string;
    tokens: number;
    rascals: Rascal[];
    defense: Rascal[];
    attack: Rascal[];
    rank: string;
    battleHistories: BattleHistory[];
    elo: bigint;
    rascalFragment: bigint;

    constructor(id: Principal, username: string, profilePictureUrl: string, dateJoined: Date, tokens: number, rascals: Rascal[], defense: Rascal[], sell: Rascal[], league: League, battleHistories: BattleHistory[], elo: number) {
        this.id = id;
        this.username = username;
        this.password = "";
        this.profilePictureUrl = profilePictureUrl;
        this.dateJoined = dateJoined.toString();
        this.tokens = tokens;
        this.rascals = rascals;
        this.defense = defense;
        this.attack = [];
        this.rank = league;
        this.battleHistories = battleHistories;
        this.elo = BigInt(elo);
        this.rascalFragment = BigInt(0);
    }
}

export function saveUser(user: User) {
    let check = matchmaking.updateUser(user.id, user);
    console.log(check);
}

export function sellRascal(rascal: Rascal) {
    matchmaking.sellRascal(rascal)
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

export function gacha(user: User) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if(randomNumber <= 1) {
        user.rascals.push(legendRascal[Math.floor(Math.random() * legendRascal.length)]);
    } else if (randomNumber <= 5) {
        user.rascals.push(epicRascal[Math.floor(Math.random() * epicRascal.length)]);
    } else if (randomNumber <= 35) {
        user.rascals.push(rareRascal[Math.floor(Math.random() * rareRascal.length)]);
    } else {
        user.rascals.push(CommonRascal[Math.floor(Math.random() * CommonRascal.length)]);
    }

    saveUser(user);
}