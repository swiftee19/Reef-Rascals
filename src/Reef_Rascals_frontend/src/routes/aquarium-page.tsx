import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import { Rarity, Rascal, RascalType } from "../types/rascal";

export default function AquariumPage(){

    const rascal1: Rascal = new Rascal(
        "#10070111730",
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
        "#10070111730",
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

    const rascal3: Rascal = new Rascal(
        "#10070111730",
        "Twinkler",
        2,
        "/rascals/twinkler.png",
        RascalType.Fearless,
        Rarity.Common,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    )

    const rascals = [rascal1, rascal2, rascal3];

    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <AquariumCanvas rascals={rascals}/>
                <header className={styles.aquariumTop}>
                    <SlideWoodBtn/>
                </header>
                <footer className={styles.aquariumBottom}>
                    <img src="/wood-round.png" alt="" />
                </footer>
        </div>
        </>
    )
}