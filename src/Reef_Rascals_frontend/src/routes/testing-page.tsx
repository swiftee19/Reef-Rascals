import "../scss/pages/profile-page.scss";
import {useEffect} from "react";
import SidebarNav from "../components/sidebar-nav";

export default function ProfilePage() {
    useEffect(() => {
        document.title = "Reef Rascals | Profile"
    }, [])

    return (
        <>
            <div className={"main-container"}>
                <SidebarNav/>
                <h2>Profile</h2>
            </div>
        </>
    )
}