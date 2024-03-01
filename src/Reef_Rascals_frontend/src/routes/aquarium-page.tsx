import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";

export default function AquariumPage(){
    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <div className={styles.aquariumContainer}>
                    <footer className={styles.aquariumBottom}>
                        <img src="/wood-round.png" alt="" />
                    </footer>
                    <header className={styles.aquariumTop}>
                        <SlideWoodBtn/>
                    </header>
                </div>
            </div>
        </>
    )
}