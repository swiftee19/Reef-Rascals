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
    level: number;
    imageUrl: string;
    type: RascalType;
    rarity: Rarity;
    health: number;
    attack: number;
    speed: number;

    constructor(id: string, name: string, level: number, imageUrl: string, type: RascalType, rarity: Rarity, health: number, attack: number, speed: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.imageUrl = imageUrl;
        this.type = type;
        this.rarity = rarity;
        this.health = health;
        this.attack = attack;
        this.speed = speed;
    }
}