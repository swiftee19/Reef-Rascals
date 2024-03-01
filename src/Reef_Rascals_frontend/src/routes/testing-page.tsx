import { matchmaking } from "../../../declarations/matchmaking";
import SidebarNav from "../components/sidebar-nav";
import { BattleHistory, BattleResult } from "../types/battle-history";
import { Rarity, Rascal, RascalType } from "../types/rascal";
import { League, User, saveUser } from '../types/user';
import { Principal } from '@dfinity/principal';
import styles from "../scss/pages/match-page.module.scss";

export default function TestingPage() {

    const rascal1: Rascal = new Rascal(
        "#10070111730",
        "Axolberry",
        3,
        "/rascals/axolberry.png",
        RascalType.Chubby,
        Rarity.Common,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    );

    const rascal2: Rascal = new Rascal(
        "#10070111730",
        "Captain Finbite",
        6,
        "/rascals/captain-finbite.png",
        RascalType.Fearless,
        Rarity.Epic,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    );

    const rascal3: Rascal = new Rascal(
        "#10070111730",
        "Ribble",
        2,
        "/rascals/ribble.png",
        RascalType.Fearless,
        Rarity.Rare,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    );

    const opponent = new User(
        Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        "Alexander Ryan Alex",
        "/Ganyu.jpg",
        new Date(),
        0.123,
        [],
        [],
        [],
        League.Silver,
        [],
        243
    )

    const battleHistory: BattleHistory = {
        result: BattleResult.Lose,
        date: new Date().toLocaleTimeString(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: [rascal1, rascal2],
        usedRascal: [rascal2, rascal1, rascal3]
    }

    const battleHistory1: BattleHistory = {
        result: BattleResult.Win,
        date: new Date().toLocaleTimeString(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: [rascal1, rascal2, rascal1],
        usedRascal: [rascal2, rascal2, rascal3]
    }

    const user = new User(
        Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        "Alexander Irvin Ryan",
        "/Ganyu.jpg",
        new Date(),
        0.123,
        [rascal1, rascal2, rascal3],
        [rascal1, rascal2, rascal3],
        [],
        League.Silver,
        [battleHistory, battleHistory1, battleHistory1, battleHistory1, battleHistory, battleHistory1],
        267
    )

    async function save(user: User) {
        saveUser(user)
    }

    async function get() {
        let user =  await matchmaking.getAllUser();
        console.log(user)   
    }

    async function register() {
        let tes = await matchmaking.register(user);
        console.log(tes);
    }
    return (
        <>
            <div className={styles.mainContainer}>
                <SidebarNav />
                <button onClick={()=> register}>save</button>
                <button onClick={()=> save(user)}>save</button>
                <button onClick={()=> get()}>get</button>
            </div>
        </>
    )
}
