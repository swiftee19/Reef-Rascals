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

export type Rascal = {
    id: string;
    name: string;
    level: number;
    imageUrl: string;
    type: RascalType;
    rarity: Rarity;
}