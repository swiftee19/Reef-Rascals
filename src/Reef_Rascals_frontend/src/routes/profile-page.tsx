import "../scss/pages/profile-page.scss";
import SidebarNav from "../components/sidebar-nav";
import {League, User} from "../types/user";
import RadialContainer from "../components/radial-container";
import {useEffect, useState} from "react";
import {BattleResult} from "../types/battle-history";

export default function ProfilePage() {
    const [userVictories, setUserVictories] = useState(0)
    const [userLoses, setUserLoses] = useState(0)
    const [userWinRate, setUserWinRate] = useState(0)

    const imageErrorMessage = "Image not found";

    const user: User = {
        profilePictureUrl: "/Ganyu.jpg",
        name: "Alexander Irvin Ryan",
        token: 0.123,
        battleHistories: [],
        league: League.Silver,
        rascals: [],
        dateJoined: new Date(),
        id: "#18270312730"
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
    }, [])

    return (
        <>
            <SidebarNav/>
            <img className={"backdrop"} src="/bg-aquarium.png" alt="image not found"/>
            <div className={"backdrop-overlay"}/>
            <div className={"main-container"}>
                <div className={"left-container"}>
                    <div className={"user-profile-container"}>
                        <img className={"profile-picture"} src="/Ganyu.jpg" alt={"Image not found"}/>
                        <div className={"user-info-container"}>
                            <p className={"khula sm"}>
                                Date Joined: {user.dateJoined.toDateString()}
                            </p>
                            <h1 className={"khula bold"}>
                                {user.name}
                            </h1>
                            <p className={"khula sm"}>
                                Player ID: {user.id}
                            </p>
                            <RadialContainer>
                                <div className={"user-token"}>
                                    <img src="/favicon.ico" alt={"Image not found"}/>
                                    <p>
                                        {user.token}
                                    </p>
                                </div>
                            </RadialContainer>
                        </div>
                    </div>
                    <RadialContainer>
                        <div className={"battle-summary-container"}>
                            <div className={"flex-column"}>
                                <span className={"flex-row"}>
                                    <img className={"battle-summary-icon"} src="/sword-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={"khula sm"}>
                                        Matches
                                    </p>
                                </span>
                                <h1 className={"khula bold light-blue"}>
                                    {user.battleHistories.length}
                                </h1>
                            </div>
                            <div className={"flex-column"}>
                                <span className={"flex-row"}>
                                    <img className={"battle-summary-icon"} src="/crown-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={"khula sm"}>
                                        Victory
                                    </p>
                                </span>
                                <h1 className={"khula bold turqouise"}>
                                    {userVictories}
                                </h1>
                            </div>
                            <div className={"flex-column"}>
                                <span className={"flex-row"}>
                                    <img className={"battle-summary-icon"} src="/skull-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={"khula sm"}>
                                        Defeat
                                    </p>
                                </span>
                                <h1 className={"khula bold light-orange"}>
                                    {userLoses}
                                </h1>
                            </div>
                            <div className={"flex-column"}>
                                <span className={"flex-row"}>
                                    <img className={"battle-summary-icon"} src="/percentage-icon.svg"
                                         alt={"Image not fount"}/>
                                    <p className={"khula sm"}>
                                        Win Rate
                                    </p>
                                </span>
                                <h1 className={"khula bold light-blue"}>
                                    {userWinRate}
                                </h1>
                            </div>
                        </div>
                    </RadialContainer>
                </div>

                <div className={"right-container"}>

                </div>
            </div>
        </>
    )
}