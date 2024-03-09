import { Rarity, Rascal, RascalType } from './rascal';

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
