import {Principal} from "@dfinity/principal";
import {v4 as uuidv4} from 'uuid';
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

export function getRarityFromString(value: string): Rarity{
    return Object.values(Rarity).find((rarity) => rarity === value) as Rarity;
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
        this.price = 0;
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

const rascal3 = new Rascal(
    "Circus Clio",
    "/rascals/circus-clio.png",
    RascalType.Chubby,
    Rarity.Common,
    200,
    20,
    20,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal4 = new Rascal(
    "Gloomy Bob",
    "/rascals/gloomy-bob.png",
    RascalType.Chubby,
    Rarity.Common,
    230,
    10,
    30,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal7 = new Rascal(
    "Party Spine",
    "/rascals/party-spine.png",
    RascalType.Fearless,
    Rarity.Common,
    100,
    40,
    30,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal9 = new Rascal(
    "Snooze Puff",
    "/rascals/snooze-puff.png",
    RascalType.Chubby,
    Rarity.Rare,
    350,
    20,
    20,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal5 = new Rascal(
    "King Octo",
    "/rascals/king-octo.png",
    RascalType.Fearless,
    Rarity.Rare,
    70,
    50,
    50,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal6 = new Rascal(
    "Marina Showlion",
    "/rascals/marina-showlion.png",
    RascalType.Fearless,
    Rarity.Rare,
    60,
    60,
    40,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal1 = new Rascal(
    "Axolberry",
    "/rascals/axolberry.png",
    RascalType.Chubby,
    Rarity.Epic,
    400,
    25,
    20,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal10 = new Rascal(
    "Twinkler",
    "/rascals/twinkler.png",
    RascalType.Fearless,
    Rarity.Epic,
    70,
    40,
    80,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal2 = new Rascal(
    "Captain Finbite",
    "/rascals/captain-finbite.png",
    RascalType.Fearless,
    Rarity.Legend,
    100,
    100,
    60,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascal8 = new Rascal(
    "Ribble",
    "/rascals/ribble.png",
    RascalType.Chubby,
    Rarity.Legend,
    600,
    20,
    30,
    "pgjpo-clrez-kncmj-74gbk-7rlxi-raf4k-c54qy-pgj3x-mej7f-qsaur-vae",
);

const rascalList: Rascal[] = [rascal1, rascal2, rascal3, rascal4, rascal5, rascal6, rascal7, rascal8, rascal9, rascal10];
const rareRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Rare);
const epicRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Epic);
const legendRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Legend);
const commonRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Common);

export default rascalList;
export { rareRascal, epicRascal, legendRascal, commonRascal };