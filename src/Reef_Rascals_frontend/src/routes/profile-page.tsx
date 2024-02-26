import "../scss/pages/profile-page.scss";
import SidebarNav from "../components/sidebar-nav";
import { League, User } from "../types/user";

export default function ProfilePage() {

    const user: User = {
        profilePictureUrl: "/Ganyu.jpg",
        name: "Alexander Irvin Ryan",
        battleHistories: [],
        league: League.Silver,
        rascals: [],
        dateJoined: new Date(),
        id: "#18270312730"
    }

    return (
        <>
        <SidebarNav/>
        <div className={"main-container"}>
            <img className={"backdrop"} src="/bg-aquarium.png" alt="image not found"/>
            <div className={"backdrop-overlay"}/>
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
                    </div>
                </div>
            </div>

            <div className={"right-container"}>

            </div>
        </div>
        </>
    )
}