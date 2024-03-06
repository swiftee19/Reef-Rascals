import {Principal} from "@dfinity/principal";
import {v4 as uuidv4} from 'uuid';
import rascalList from "./rascal-dummy";
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
    const rascal = rascals[Math.floor(Math.random() * rascals.length)];

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
        newUser.rascals.push(newRascal);
        await matchmaking.register(newUser);
        return newRascal;
    }

    return null;
}
