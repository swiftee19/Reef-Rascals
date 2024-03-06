import { Principal } from "@dfinity/principal";
import {v4 as uuidv4} from 'uuid';

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

    constructor(name: string, level: number, imageUrl: string, type: RascalType, rarity: Rarity, health: number, attack: number, speed: number, owner: string) {
        this.id = `${uuidv4().slice(0, 8).toUpperCase()}`;
        this.name = name;
        this.level = BigInt(level);
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
