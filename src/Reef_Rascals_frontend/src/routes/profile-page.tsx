import "../scss/pages/profile-page.scss";
import {useEffect, useState} from "react";
import SidebarNav from "../components/sidebar-nav";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import {User} from "../types/user";

export default function ProfilePage() {
    const [daysRegistered, setDaysRegistered] = useState(0)

    useEffect(() => {
        document.title = "Reef Rascals | Profile"
    }, [])

    const testRascal1: Rascal = {
        id: "#128903580",
        name: "Snooze Puff",
        imageUrl: "/rascals/snooze-puff.png",
        level: 6,
        rarity: Rarity.Legend,
        type: RascalType.Chubby
    }

    const testRascal2: Rascal = {
        id: "#091823501",
        name: "Circus Clio",
        imageUrl: "/rascals/circus-clio.png",
        level: 2,
        rarity: Rarity.Common,
        type: RascalType.Fearless
    }

    const testRascals: Array<Rascal> = [testRascal1, testRascal2]

    const testUser: User = {
        id: "testid",
        name: "Ganyu",
        profilePictureUrl: "/Ganyu.jpg",
        registeredAt: new Date(),
        rascals: testRascals,
        wins: 3,
        battles: 5,
        winRate: 3 / 5 * 100,
    }

    useEffect(() => {
        const today = new Date();
        const registeredDate = testUser.registeredAt;
        const timeDifference = today.getTime() - registeredDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        setDaysRegistered(daysDifference);
    }, []);

    return (
        <>
            <div className={"main-container"}>
                <img className={"backdrop"} src="/temp_backdrop.png" alt="Image not found"/>
                <SidebarNav/>
                <h1>{testUser.name}'s Profile</h1>

                <div className={"top-part-container"}>
                    <div className={"left-card"}>
                        <img className={"profile-picture"} src={testUser.profilePictureUrl} alt="Image not found"/>
                        <div className={"stats-container"}>
                            <div className={"horizontal-container"}>
                                <h1>Days registered:</h1>
                                <h1>{daysRegistered} days</h1>
                            </div>

                            <span className={"horizontal-line"}/>

                            <div className={"horizontal-container"}>
                                <h1>Rascals:</h1>
                                <div className={"rascal-count-container"}>
                                    <h1>{testRascals.length} </h1>
                                    <img src="/rascals/rascal-symbol.svg" alt={"svg not found"}/>
                                </div>
                            </div>

                            <span className={"horizontal-line"}/>

                            <div className={"horizontal-container"}>
                                <h1 className={"gap"}>{testUser.battles}
                                    <img src="/sword-icon.svg"
                                         alt={"svg not found"}/>
                                    {testUser.wins}
                                    <img
                                        src="/crown-icon.svg" alt={"svg not found"}/></h1>
                            </div>
                        </div>
                    </div>

                    <div className={"right-card"}>

                    </div>
                </div>
            </div>
        </>
    )
}