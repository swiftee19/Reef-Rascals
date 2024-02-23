import SidebarNav from "../components/sidebar-nav";
import Sidebar from "../components/sidebar-nav";
import "../scss/pages/profile-page.scss";
import {useEffect} from "react";

export default function ProfilePage() {
    useEffect(()=>{
        document.title = "Reef Rascals | Profile"
    }, [])

    return (
        <>
            <div className={"main-container"}>
                <SidebarNav/>
                profile
            </div>
        </>
    )
}