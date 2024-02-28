import styles from "../scss/pages/profile-page.module.scss";
import SidebarNav from "../components/sidebar-nav";
import {League, LeagueThresholdNumber, User} from "../types/user";
import RadialContainer from "../components/radial-container";
import {useEffect, useState} from "react";
import {BattleHistory, BattleResult} from "../types/battle-history";
import BattleHistoryCard from "../components/battle-history-card";
import {Rarity, Rascal, RascalType} from "../types/rascal";

export default function ProfilePage() {
    const [userVictories, setUserVictories] = useState(0)
    const [userLoses, setUserLoses] = useState(0)
    const [userWinRate, setUserWinRate] = useState(0)
    const [userLeagueProgress, setUserLeagueProgress] = useState(0)
    const [leagueFontColor, setLeagueFontColor] = useState("black")
    const [userLeagueIcon, setUserLeagueIcon] = useState("")

    const rascal1: Rascal = {
        rarity: Rarity.Common,
        level: 3,
        imageUrl: "/rascals/axolberry.png",
        id: "#10070111730",
        name: "Axolberry",
        attack: 10,
        health: 20,
        speed: 30,
        type: RascalType.Chubby
    }

    const rascal2: Rascal = {
        rarity: Rarity.Epic,
        level: 6,
        imageUrl: "/rascals/captain-finbite.png",
        id: "#10070111730",
        name: "Captain Finbite",
        attack: 10,
        health: 20,
        speed: 30,
        type: RascalType.Fearless
    }

    const rascal3: Rascal = {
        rarity: Rarity.Rare,
        level: 2,
        imageUrl: "/rascals/ribble.png",
        id: "#10070111730",
        name: "Ribble",
        attack: 10,
        health: 20,
        speed: 30,
        type: RascalType.Fearless
    }

    const opponent: User = {
        profilePictureUrl: "/Ganyu.jpg",
        name: "Alexander Ryan Alex",
        token: 0.123,
        battleHistories: [],
        league: League.Silver,
        rascals: [],
        defense: [],
        dateJoined: new Date(),
        id: "#18270111730",
        elo: 243
    }

    const battleHistory: BattleHistory = {
        result: BattleResult.Lose,
        date: new Date(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: [rascal1, rascal2],
        usedRascal: [rascal2, rascal1, rascal3]
    }

    const battleHistory1: BattleHistory = {
        result: BattleResult.Win,
        date: new Date(),
        id: "#18222212730",
        opponent: opponent,
        opponentRascal: [rascal1, rascal2, rascal1],
        usedRascal: [rascal2, rascal2, rascal3]
    }

    const user: User = {
        profilePictureUrl: "/Ganyu.jpg",
        name: "Alexander Irvin Ryan",
        token: 0.123,
        battleHistories: [battleHistory, battleHistory1],
        league: League.Silver,
        rascals: [],
        defense: [],
        dateJoined: new Date(),
        id: "#18270312730",
        elo: 267
    }

    const calculateLeagueSliderProgress = () => {
        switch (user.league) {
            case League.Bronze:
                return (user.elo / LeagueThresholdNumber.Silver) * 100
            case League.Silver:
                return (user.elo / LeagueThresholdNumber.Gold) * 100
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
            setUserWinRate(winRate)
        }

        setUserLeagueProgress(calculateLeagueSliderProgress())

        switch (user.league) {
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
    }, [])

    return (
        <>
            <SidebarNav/>
            <img className={styles.backdrop} src="/bg-aquarium.png" alt="image not found"/>
            <div className={styles.backdropOverlay}/>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.userProfileContainer}>
                        <img className={styles.profilePicture} src="/Ganyu.jpg" alt={"Image not found"}/>
                        <div className={styles.userInfoContainer}>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                Date Joined: {user.dateJoined.toDateString()}
                            </p>
                            <h1 className={`${styles.khula} ${styles.white}`}>
                                {user.name}
                            </h1>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                Player ID: {user.id}
                            </p>
                            <RadialContainer>
                                <div className={styles.userToken}>
                                    <img src="/favicon.ico" alt={"Image not found"}/>
                                    <p>
                                        {user.token}
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
                                        {user.league}
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
                                    {user.elo}/{LeagueThresholdNumber[user.league] + 100}
                                </p>
                            </div>
                        </div>
                    </RadialContainer>
                </div>

                <div className={styles.rightContainer}>
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