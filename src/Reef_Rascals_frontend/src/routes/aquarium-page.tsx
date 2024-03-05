import {useEffect, useState} from "react";
import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import MyRascalPage from "./my-rascal-page";
import WoodStats from "../components/wood-stats";
import { useAuthContext } from "../middleware/middleware";
import { getCurrentUser } from "../types/auth";
import { User } from "../types/user";

export default function AquariumPage() {
    const [isAquarium, setIsAquarium] = useState(true);
    const authContext = useAuthContext();
    const [principal, setPrincipal] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currUser, setCurrUser] = useState<User | null>(null);
    const [rascals, setRascals] = useState<Rascal[]>([]);
    const [isLoadingRascals, setIsLoadingRascals] = useState(true);

    async function userSetUp() {
        const user = await getCurrentUser()
        if(user) {
            setCurrUser(user)
            setRascals(user.rascals)
            setIsLoadingRascals(false)
            console.log("rascals", rascals)
        }
    }

    const togglePage = () => {
        setIsAquarium(!isAquarium);
    }

    const findMatch = () => {
        const currentRoute = window.location.href;
        const routeSplit = currentRoute.split("?")
        const tempCanisterId = routeSplit[1];
        const canisterId = "?" + tempCanisterId
        window.location.href = "/match" + canisterId;
    }

    if(isLoadingRascals) {
        userSetUp()
        return <div>Loading...</div>
    }

    var arrayRascals = Array.from(rascals)

    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <img className={styles.background} src="/bg-aquarium.png"/>
                <AquariumCanvas rascals={rascals}/>

                <footer className={styles.aquariumBottom} onClick={(e) => {
                    findMatch();
                }}>
                    <img src="/wood-round.png" alt=""/>
                </footer>

                <section className={`${styles.myRascalPage} ${isAquarium ? "" : styles.slideUp}`}>
                    <MyRascalPage {...arrayRascals}/>
                </section>

                <header className={styles.aquariumTop}>
                    <SlideWoodBtn onToggle={togglePage} isAquarium={isAquarium}/>
                    <div className={styles.aquariumStats}>
                        <WoodStats image="/raslet.png" color="colors.$green-raslet" curr={5} max={7}/>
                        <WoodStats image="/rascal-egg-top.png" curr={10}/>
                        <WoodStats image="/favicon.ico" curr={0.2}/>
                    </div>
                </header>
            </div>
        </>
    )
}