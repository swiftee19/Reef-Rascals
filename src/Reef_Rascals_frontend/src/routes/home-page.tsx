import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/home-page.module.scss";

export default function HomePage() {
    let backSeaImg = document.getElementById("backSeaImg");
    let backStoneImg = document.getElementById("backStoneImg");
    let midImg = document.getElementById("midImg");
    let frontImg = document.getElementById("frontImg");
    let logo = document.getElementById("logo");

    window.addEventListener('scroll', function() {
        let value = window.scrollY;
        logo!.style.marginTop = value * 2.5 + 'px';
        midImg!.style.marginTop = value * 0.15 + 'px';
        backStoneImg!.style.marginTop = value * 0.25 + 'px';
    });

    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <section className={styles.parallaxContainer}>
                    <img id="backSeaImg" src="/bg-parallax-back-sea.png" alt="" />
                    <img id="backStoneImg" src="/bg-parallax-back-stone.png" alt="" />
                    <img id="midImg" src="/bg-parallax-mid.png" alt="" />
                    <img id="lightImg" className={styles.lightImg} src="/bg-parallax-light.png" alt="" />
                    <img id="logo" className={styles.logo} src="/logo-full.png" alt="" />
                    <img id="frontImg" src="/bg-parallax-front.png" alt="" />
                </section>

                <section className={styles.introContainer}>
                    <h1>Introducing Reef Rascals</h1>
                    <p>Reef Rascals is a game where you collect, battle and trade your
                    cute, pesky Rascals. Play this game long enough and you can
                    also gain fortune!</p>
                    <p>Join us and have fun!</p>
                </section>
            </div>
        </>
    )
}