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
import {useAuthContext} from "../middleware/middleware";
import {matchmaking} from '../../../declarations/matchmaking';
import {getCurrentUser} from '../types/auth';
import LoadingPage from "../components/loading-page";

export default function ProfilePage() {
    const [userVictories, setUserVictories] = useState(0)
    const [userLoses, setUserLoses] = useState(0)
    const [userWinRate, setUserWinRate] = useState(0)
    const [userLeagueProgress, setUserLeagueProgress] = useState(0)
    const [leagueFontColor, setLeagueFontColor] = useState("black")
    const [userLeagueIcon, setUserLeagueIcon] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(true)


    const authContext = useAuthContext();
    const [currUser, setCurrUser] = useState<User>({} as User)

    const calculateLeagueSliderProgress = () => {
        switch (currUser.rank) {
            case League.Bronze:
                return (getElo(currUser) / LeagueThresholdNumber.Silver) * 100
            case League.Silver:
                return (getElo(currUser) / LeagueThresholdNumber.Gold) * 100
            case League.Gold:
                return 100
        }
    }

    async function userSetUp() {
        const user = await getCurrentUser()
        if (user) {
            setCurrUser(user)
            if (currUser) {
                const battleArray: BattleHistory[] = currUser.battleHistories
    
                if (battleArray.length == 0) {
                    setUserWinRate(0)
                } else {
                    const victories = battleArray.filter(battle => battle.result == BattleResult.Win).length
                    setUserVictories(victories)
    
                    const loses = battleArray.filter(battle => battle.result == BattleResult.Lose).length
                    setUserLoses(loses)
    
                    const winRate = (victories / (victories + loses)) * 100
                    const roundedWinRate = Math.round(winRate * 100) / 100
                    setUserWinRate(roundedWinRate)
                }
    
                setUserLeagueProgress(calculateLeagueSliderProgress() as number)
    
                switch (currUser.rank) {
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

                setLoading(false)
            }
        }
    }

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }

    const handleEnterKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            saveUser({...currUser, username: username});
        }
    }

    if (loading) {
        userSetUp()
        return (
            <>
                <LoadingPage/>
            </>
        );
    }

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
                                Date Joined: {new Date(currUser?.dateJoined!).toLocaleDateString()}
                            </p>
                            <h1 className={`${styles.khula} ${styles.white}`}>
                                <input className={styles.nameInput} type="text" value={currUser?.username}
                                       onChange={handleUsernameChange} onKeyDown={handleEnterKeyPress}/>
                            </h1>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                Player ID:
                            </p>
                            <p className={`${styles.khula} ${styles.sm}`}>
                                {authContext.principal}
                            </p>
                            <RadialContainer>
                                <div className={styles.userToken}>
                                    <img src="/favicon.ico" alt={"Image not found"}/>
                                    <p>
                                        {currUser.tokens.toString()}
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
                                        {currUser.battleHistories.length}
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
                            <div className={styles.line}/>
                            <div className={styles.leagueInfoContainer}>
                                <img src="/silver-league-icon.png" alt={"Image not found"}/>
                                <div className={styles.leagueInfo}>
                                    <h1 style={{color: leagueFontColor}}>
                                        {currUser.rank}
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
                                    {getElo(currUser)}/{LeagueThresholdNumber[currUser.rank as League] + 100}
                                </p>
                            </div>
                        </div>
                    </RadialContainer>
                </div>

                <div className={styles.rightContainer}>
                    {currUser.battleHistories.map((battle, index) =>
                        <>
                            <BattleHistoryCard battleHistory={battle}/>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}