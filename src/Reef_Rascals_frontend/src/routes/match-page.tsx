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
import rascalList from '../types/rascal-dummy';

export default function MatchPage() {

    const rascals: Rascal[] = rascalList
    const opponent = {
        id: Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        username: "Alexander Ryan Alex",
        profilePictureUrl: "/Ganyu.jpg",
        dateJoined: new Date().toString(),
        tokens: 0.123,
        rascals: rascals.slice(0, 3),
        defense: rascals.slice(0, 3),
        attack: [],
        rank: League.Silver,
        battleHistories: [],
        elo: BigInt(243),
        raslet: BigInt(0),
        rascalFragment: BigInt(0)
    }

    const battleHistory: BattleHistory = {
        result: BattleResult.Lose,
        date: new Date().toLocaleTimeString(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: rascals.slice(0, 3),
        usedRascal: rascals.slice(0, 3)
    }

    const battleHistory1: BattleHistory = {
        result: BattleResult.Win,
        date: new Date().toLocaleTimeString(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: rascals.slice(0, 3),
        usedRascal: rascals.slice(0, 3)
    }

    const user = {
        id: Principal.fromText("whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"),
        username: "Alexander Irvin Ryan",
        profilePictureUrl: "/Ganyu.jpg",
        dateJoined: new Date().toString(),
        tokens: 0.123,
        rascals: rascals.slice(4, 7),
        defense: rascals.slice(4, 7),
        attack: [],
        rank: League.Silver,
        battleHistories: [battleHistory, battleHistory1, battleHistory1, battleHistory1, battleHistory, battleHistory1],
        elo: BigInt(267),
        raslet: BigInt(0),
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

    return (
        <>
            <img className={styles.bgBack} src={"/bg-brawl-sea.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-bottom.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-top.png"} alt={"image not found"}/>
            <div className={styles.mainContainer}>
                <MatchCanvas player={user} opponent={opponent}/>
            </div>
            <div className={styles.topPart}>
                <div className={styles.topLeft}>

                </div>
                <div className={styles.topRight}>
                    
                </div>
            </div>
        </>
    )
}