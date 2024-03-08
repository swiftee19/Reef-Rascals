import {Principal} from "@dfinity/principal";
import {v4 as uuidv4} from 'uuid';
import rascalList, { commonRascal, epicRascal, legendRascal, rareRascal } from "./rascal-dummy";
import {matchmaking} from "../../../declarations/matchmaking";

export const enum RascalType {
    Fearless = "Fearless",
    Chubby = "Chubby",
}

export enum Rarity {
    Common = "Common",
    Rare = "Rare",
    Epic = "Epic",
    Legend = "Legend"
}

export class Rascal {
    id: string;
    name: string;
    level: bigint;
    imageUrl: string;
    tribe: string;
    rarity: string;
    health: bigint;
    attack: bigint;
    speed: bigint;
    owner: Principal;
    price: number;

    constructor(name: string, imageUrl: string, type: RascalType, rarity: Rarity, health: number, attack: number, speed: number, owner: string) {
        this.id = `${uuidv4().slice(0, 8).toUpperCase()}`;
        this.name = name;
        this.level = BigInt(1);
        this.imageUrl = imageUrl;
        this.tribe = type;
        this.rarity = rarity;
        this.health = BigInt(health);
        this.attack = BigInt(attack);
        this.speed = BigInt(speed);
        this.owner = Principal.fromText(owner);
        this.price = 0.111;
    }
}

export async function gachaRascal(owner: string) {
    const rascals = rascalList;
    let rascal = null;
    const random = (Math.random() * 100) + 1;
    if(random <= 1) {
        rascal = legendRascal[Math.floor(Math.random() * legendRascal.length)];
    } else if(random <= 10) {
        rascal = epicRascal[Math.floor(Math.random() * epicRascal.length)];
    } else if(random <= 30) {
        rascal = rareRascal[Math.floor(Math.random() * rareRascal.length)];
    } else {
        rascal = commonRascal[Math.floor(Math.random() * commonRascal.length)];
    }

    const maximumAttackDeviation = 5;
    const maximumSpeedDeviation = 5;
    const maximumHealthDeviation = 20;

    // give standard deviation to rascal attack, speed, and health
    const plusMinus = Math.random() < 0.5 ? -1 : 1;
    const attack = rascal.attack + BigInt(Math.floor(Math.random() * maximumAttackDeviation) * plusMinus);
    const speed = rascal.speed + BigInt(Math.floor(Math.random() * maximumSpeedDeviation) * plusMinus);
    const health = rascal.health + BigInt(Math.floor(Math.random() * maximumHealthDeviation) * plusMinus);

    const newRascal = new Rascal(rascal.name, rascal.imageUrl, <RascalType>rascal.tribe, <Rarity>rascal.rarity, Number(health), Number(attack), Number(speed), owner);

    const user = await matchmaking.getUser(Principal.fromText(owner));

    if (user) {
        const newUser = user[0];
        await matchmaking.getGacha(newRascal);
        return newRascal;
    }

    return null;
}

export async function setUserAttackRascal(owner: string, battleRascal1: Rascal | null, battleRascal2: Rascal | null, battleRascal3: Rascal | null) {
    const user = await matchmaking.getUser(Principal.fromText(owner));
    const attackRascals: Rascal[] = [];

    if (battleRascal1) {
        attackRascals.push(battleRascal1);
    }
    if (battleRascal2) {
        attackRascals.push(battleRascal2);
    }
    if (battleRascal3) {
        attackRascals.push(battleRascal3);
    }

    if (user) {
        const newUser = user[0];
        await matchmaking.setUserAttackRascal(attackRascals, newUser.id)
    }
}

export async function setUserDefenseRascal(owner: string, defenseRascal1: Rascal | null, defenseRascal2: Rascal | null, defenseRascal3: Rascal | null) {
    const user = await matchmaking.getUser(Principal.fromText(owner));
    const defenseRascals: Rascal[] = [];

    if (defenseRascal1) {
        defenseRascals.push(defenseRascal1);
    }
    if (defenseRascal2) {
        defenseRascals.push(defenseRascal2);
    }
    if (defenseRascal3) {
        defenseRascals.push(defenseRascal3);
    }

    if (user) {
        const newUser = user[0];
        matchmaking.setUserDefenseRascal(defenseRascals, newUser.id).then((result)=>{
            return result;
        })
    }

    return "no user found"
}