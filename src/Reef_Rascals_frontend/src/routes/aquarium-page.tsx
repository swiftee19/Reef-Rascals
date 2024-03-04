import {useState} from "react";
import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import MyRascalPage from "./my-rascal-page";
import WoodStats from "../components/wood-stats";

export default function AquariumPage() {
    const [isAquarium, setIsAquarium] = useState(true);

    const rascal1: Rascal = new Rascal(
        "Circus Clio",
        2,
        "/rascals/circus-clio.png",
        RascalType.Fearless,
        Rarity.Common,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    )

    const rascal2: Rascal = new Rascal(
        "Axolberry",
        2,
        "/rascals/axolberry.png",
        RascalType.Fearless,
        Rarity.Common,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    )

    const rascals = [rascal1, rascal2];
    const togglePage = () => {
        setIsAquarium(!isAquarium);
    }

    const findMatch = () => {
        const currentRoute = window.location.href;
        // console.log(currentRoute)
        const routeSplit = currentRoute.split("?")
        // console.log(routeSplit)
        const tempCanisterId = routeSplit[1];
        const canisterId = "?" + tempCanisterId
        window.location.href = "/match" + canisterId;
    }

    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <img className={styles.background} src="/bg-aquarium.png"/>
                <AquariumCanvas rascals={rascals}/>

                <footer className={styles.aquariumBottom} onClick={() => {
                    findMatch()
                }}>
                    <img src="/wood-round.png" alt=""/>
                </footer>

                <section className={`${styles.myRascalPage} ${isAquarium ? "" : styles.slideUp}`}>
                    <MyRascalPage/>
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