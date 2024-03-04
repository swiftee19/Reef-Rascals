import React, {useState} from 'react';
import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";
import {League, User} from '../types/user';
import {authManager} from '../types/auth';
import MatchCanvas from "../components/match-canvas";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import {Principal} from "@dfinity/principal";
import {BattleHistory, BattleResult} from "../types/battle-history";

export default function MatchPage() {

    const rascal1: Rascal = new Rascal(
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

    const opponent = {
        id: Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        username: "Alexander Ryan Alex",
        profilePictureUrl: "/Ganyu.jpg",
        dateJoined: new Date().toString(),
        tokens: 0.123,
        rascals: [rascal2, rascal2, rascal3],
        defense: [rascal2, rascal1, rascal3],
        attack: [],
        rank: League.Silver,
        battleHistories: [],
        elo: BigInt(243),
        rascalFragment: BigInt(0)
    }

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

    const user = {
        id: Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        username: "Alexander Irvin Ryan",
        profilePictureUrl: "/Ganyu.jpg",
        dateJoined: new Date().toString(),
        tokens: 0.123,
        rascals: [rascal1, rascal2, rascal3],
        defense: [rascal1, rascal2, rascal3],
        attack: [],
        rank: League.Silver,
        battleHistories: [battleHistory, battleHistory1, battleHistory1, battleHistory1, battleHistory, battleHistory1],
        elo: BigInt(267),
        rascalFragment: BigInt(0)
    }


    let currUser = authManager.getCurrentUser();

    let [inGame, setInGame] = useState(true);

    let users: User[] = [];

    async function searchForMatch(): Promise<User> {
        if (currUser === null) throw new Error("User not logged in");
        users = await matchmaking.getOpponents(currUser);
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomOpponent = users[randomIndex];
        return randomOpponent;
    }

    let i = 0;
    let userCurrRascal = 0;
    let opponentCurrRascal = 0;

    return (
        <>
            <img className={styles.bgBack} src={"/bg-brawl-sea.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-bottom.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-top.png"} alt={"image not found"}/>
            <div className={styles.mainContainer}>
                <MatchCanvas user1={user} user2={opponent}/>
            </div>
        </>
    )
}