import { Rarity, Rascal, RascalType } from './rascal';

const rascal1 = new Rascal(
    "Axolberry",
    "/rascals/axolberry.png",
    RascalType.Chubby,
    Rarity.Epic,
    200,
    20,
    10,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal2 = new Rascal(
    "Captain Finbite",
    "/rascals/captain-finbite.png",
    RascalType.Fearless,
    Rarity.Legend,
    100,
    40,
    20,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal3 = new Rascal(
    "Circus Clio",
    "/rascals/circus-clio.png",
    RascalType.Chubby,
    Rarity.Common,
    200,
    10,
    30,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal4 = new Rascal(
    "Gloomy Bob",
    "/rascals/gloomy-bob.png",
    RascalType.Chubby,
    Rarity.Common,
    200,
    10,
    30,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal5 = new Rascal(
    "King Octo",
    "/rascals/king-octo.png",
    RascalType.Fearless,
    Rarity.Rare,
    100,
    40,
    35,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal6 = new Rascal(
    "Marina Showlion",
    "/rascals/marina-showlion.png",
    RascalType.Fearless,
    Rarity.Rare,
    100,
    40,
    20,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal7 = new Rascal(
    "Party Spine",
    "/rascals/party-spine.png",
    RascalType.Fearless,
    Rarity.Common,
    100,
    40,
    20,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal8 = new Rascal(
    "Ribble",
    "/rascals/ribble.png",
    RascalType.Chubby,
    Rarity.Legend,
    200,
    10,
    30,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal9 = new Rascal(
    "Snooze Puff",
    "/rascals/snooze-puff.png",
    RascalType.Chubby,
    Rarity.Rare,
    200,
    10,
    30,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascal10 = new Rascal(
    "Twinkler",
    "/rascals/twinkler.png",
    RascalType.Fearless,
    Rarity.Epic,
    100,
    30,
    20,
    "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae",
);

const rascalList: Rascal[] = [rascal1, rascal2, rascal3, rascal4, rascal5, rascal6, rascal7, rascal8, rascal9, rascal10];
const rareRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Rare);
const epicRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Epic);
const legendRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Legend);
const CommonRascal: Rascal[] = rascalList.filter(rascal => rascal.rarity === Rarity.Common);

export default rascalList;
export { rareRascal, epicRascal, legendRascal, CommonRascal };
