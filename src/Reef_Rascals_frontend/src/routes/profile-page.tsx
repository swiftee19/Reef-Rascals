import React, {useRef} from 'react';
import styles from "../scss/pages/profile-page.module.scss";
import SidebarNav from "../components/sidebar-nav";
import {League, LeagueThresholdNumber, User, getElo, saveUser} from "../types/user";
import RadialContainer from "../components/radial-container";
import {useEffect, useState} from "react";
import {BattleHistory, BattleResult} from "../types/battle-history";
import BattleHistoryCard from "../components/battle-history-card";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import {Principal} from "@dfinity/principal";
import { Int } from '@dfinity/candid/lib/cjs/idl';

export default function ProfilePage() {
    const [userVictories, setUserVictories] = useState(0)
    const [userLoses, setUserLoses] = useState(0)
    const [userWinRate, setUserWinRate] = useState(0)
    const [userLeagueProgress, setUserLeagueProgress] = useState(0)
    const [leagueFontColor, setLeagueFontColor] = useState("black")
    const [userLeagueIcon, setUserLeagueIcon] = useState("")
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const rightContainerRef = useRef<HTMLDivElement>(null);

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

    const calculateLeagueSliderProgress = () => {
        switch (user.rank) {
            case League.Bronze:
                return (getElo(user)  / LeagueThresholdNumber.Silver) * 100
            case League.Silver:
                return (getElo(user) / LeagueThresholdNumber.Gold) * 100
            case League.Gold:
                return 100
        }
    }

    useEffect(() => {
        const victories = user.battleHistories.filter(battle => battle.result == BattleResult.Win).length
        setUserVictories(victories)

        const loses = user.battleHistories.filter(battle => battle.result == BattleResult.Lose).length
        setUserLoses(loses)

        if (victories + loses == 0) return setUserWinRate(0)
        else {
            const winRate = (victories / (victories + loses)) * 100
            const roundedWinRate = Math.round(winRate * 100) / 100
            setUserWinRate(roundedWinRate)
        }

        setUserLeagueProgress(calculateLeagueSliderProgress() as number)

        switch (user.rank) {
            case League.Bronze:
                setLeagueFontColor("#CD7F32")
                setUserLeagueIcon("/bronze-league-icon.png")
                break
            case League.Silver:
                setLeagueFontColor("#C0C0C0")
                setUserLeagueIcon("/silver-league-icon.png")
                break
            case League.Gold:
                setLeagueFontColor("#FFD700")
                setUserLeagueIcon("/gold-league-icon.png")
                break
        }

        if (rightContainerRef && leftContainerRef && rightContainerRef.current && leftContainerRef.current) {
            rightContainerRef.current.style.height = `${leftContainerRef.current.clientHeight}px`
        }
    }, [])

    return (
        <>
            <SidebarNav/>
            <img className={styles.backdrop} src="/bg-aquarium.png" alt="image not found"/>
            <div className={styles.backdropOverlay}/>
            <div className={styles.mainContainer}>
                <div ref={leftContainerRef} className={styles.leftContainer}>
                    <div className={styles.userProfileContainer}>
                        <img className={styles.profilePicture} src="/Ganyu.jpg" alt={"Image not found"}/>
                        <div className={styles.userInfoContainer}>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                Date Joined: {user.dateJoined}
                            </p>
                            <h1 className={`${styles.khula} ${styles.white}`}>
                                {user.username}
                            </h1>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                Player ID:
                            </p>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                {user.id.toString()}
                            </p>
                            <RadialContainer>
                                <div className={styles.userToken}>
                                    <img src="/favicon.ico" alt={"Image not found"}/>
                                    <p>
                                        {user.tokens.toString()}
                                    </p>
                                </div>
                            </RadialContainer>
                        </div>
                    </div>
                    <RadialContainer width={100}>
                        <div className={styles.battleSummaryMainContainer}>
                            <h2>
                                Battle Summary
                            </h2>
                            <div className={styles.line}/>
                            <div className={styles.battleSummaryContainer}>
                                <div className={styles.flexColumn}>
                                <span className={styles.flexRow}>
                                    <img className={styles.battleSummaryIcon} src="/sword-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={`${styles.khula} ${styles.sm}`}>
                                        Matches
                                    </p>
                                </span>
                                    <h1 className={`${styles.khula} ${styles.bold} ${styles.lightBlue}`}>
                                        {user.battleHistories.length}
                                    </h1>
                                </div>
                                <div className={styles.flexColumn}>
                                <span className={styles.flexRow}>
                                    <img className={styles.battleSummaryIcon} src="/crown-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={`${styles.khula} ${styles.sm}`}>
                                        Victory
                                    </p>
                                </span>
                                    <h1 className={`${styles.khula} ${styles.bold} ${styles.turqouise}`}>
                                        {userVictories}
                                    </h1>
                                </div>
                                <div className={styles.flexColumn}>
                                <span className={styles.flexRow}>
                                    <img className={styles.battleSummaryIcon} src="/skull-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={`${styles.khula} ${styles.sm}`}>
                                        Defeat
                                    </p>
                                </span>
                                    <h1 className={`${styles.khula} ${styles.bold} ${styles.lightOrange}`}>
                                        {userLoses}
                                    </h1>
                                </div>
                                <div className={styles.flexColumn}>
                                <span className={styles.flexRow}>
                                    <img className={styles.battleSummaryIcon} src="/percentage-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={`${styles.khula} ${styles.sm}`}>
                                        Win Rate
                                    </p>
                                </span>
                                    <h1 className={`${styles.khula} ${styles.bold} ${styles.white}`}>
                                        {userWinRate}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </RadialContainer>

                    <RadialContainer width={100}>
                        <div className={styles.leagueContainer}>
                            <h2>
                                Your Current League
                            </h2>
                            <div className={styles.leagueInfoContainer}>
                                <img src="/silver-league-icon.png" alt={"Image not found"}/>
                                <div className={styles.leagueInfo}>
                                    <h1 style={{color: leagueFontColor}}>
                                        {user.rank}
                                    </h1>
                                    <h1 className={styles.playerPercentageInfo}>
                                        You are in the top 79%
                                    </h1>
                                </div>
                            </div>

                            <div className={styles.sliderContainer}>
                                <div className={styles.leagueSlider}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={userLeagueProgress}
                                        style={{width: `${userLeagueProgress}%`}}
                                        className={styles.inputRange}
                                        readOnly
                                    />
                                </div>
                                <p style={{color: leagueFontColor}}>
                                    {getElo(user)}/{LeagueThresholdNumber[user.rank as League] + 100}
                                </p>
                            </div>
                        </div>
                    </RadialContainer>
                </div>

                <div ref={rightContainerRef} className={styles.rightContainer}>
                    {user.battleHistories.map((battle, index) =>
                        <>
                            <BattleHistoryCard battleHistory={battle}/>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}