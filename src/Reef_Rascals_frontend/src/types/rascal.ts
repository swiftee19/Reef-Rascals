import { Principal } from "@dfinity/principal";

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

    constructor(id: string, name: string, level: number, imageUrl: string, type: RascalType, rarity: Rarity, health: number, attack: number, speed: number, owner: string) {
        this.id = id;
        this.name = name;
        this.level = BigInt(level);
        this.imageUrl = imageUrl;
        this.tribe = type;
        this.rarity = rarity;
        this.health = BigInt(health);
        this.attack = BigInt(attack);
        this.speed = BigInt(speed);
        this.owner = Principal.fromText(owner);
    }
}