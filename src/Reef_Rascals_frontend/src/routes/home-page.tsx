import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/home-page.module.scss";

export default function HomePage() {
    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <div className={styles.parallaxContainer}>
                    <img className={styles.backImg} src="/bg-parallax-back.png" alt="" />
                    <img className={styles.midImg} src="/bg-parallax-mid.png" alt="" />
                    <div className={styles.logo}>This is Logo</div>
                    <img className={styles.frontImg} src="/bg-parallax-front.png" alt="" />
                </div>
                <div className={styles.aboutContainer}>
                    <h1>Introducing Reef Rascals</h1>
                    <p>Reef Rascals is a game where you collect, battle and trade your
                    cute, pesky Rascals. Play this game long enough and you can
                    also gain fortune!</p>
                    <p>Join us and have fun!</p>
                </div>
            </div>
        </>
    )
}