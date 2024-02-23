import Sidebar from "../components/sidebar";
import "../scss/pages/profile-page.scss";
import {useEffect} from "react";

export default function ProfilePage() {
    useEffect(()=>{
        document.title = "Reef Rascals | Profile"
    }, [])

    return (
        <>
            <div className={"main-container"}>
                <Sidebar/>
                profile
            </div>
        </>
    )
}