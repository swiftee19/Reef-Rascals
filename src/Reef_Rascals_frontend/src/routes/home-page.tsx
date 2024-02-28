import { useEffect } from "react";
import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/home-page.module.scss";
import WoodButton from "../components/wood-btn";

export default function HomePage() {
    useEffect(() => {
        const handleScroll = () => {
            const backStoneImg = document.getElementById("backStoneImg");
            const midImg = document.getElementById("midImg");
            const logo = document.getElementById("logo");

            if(backStoneImg && midImg && logo) {
                let value = window.scrollY;
                backStoneImg.style.top = value * 0.5 + 'px';
                midImg.style.top = value * 0.25 + 'px';
                logo.style.top = value * 1 + 'px';
            }

            const scrollThreshold = (2 * window.innerHeight) - 200;

            if (scrollY >= scrollThreshold) {
                const brawlTopImg = document.getElementById("brawlTopImg");

                if (brawlTopImg) {
                    let value = (window.scrollY - scrollThreshold);
                    brawlTopImg.style.top = value * 0.5 + 'px';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goLogin = () => {
        
    }

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
                    <div className={styles.loginBtn}>
                        <WoodButton btnText="Login" onClick={goLogin} />
                    </div>
                </section>

                <section className={styles.introContainer}>
                    <h1>Introducing Reef Rascals</h1>
                    <p>Reef Rascals is a game where you collect, battle and trade your
                    cute, pesky Rascals. Play this game long enough and you can
                    also gain fortune!</p>
                    <p>Join us and have fun!</p>
                </section>

                <section className={styles.brawlContainer}>
                    <img id="brawlSeaImg" src="/bg-brawl-sea.png" alt="" />
                    <img id="brawlTopImg" className={styles.brawlTopImg} src="/bg-brawl-top.png" alt="" />
                    <img id="brawlBottomImg" className={styles.brawlBottomImg} src="/bg-brawl-bottom.png" alt="" />
                    <div className={styles.brawlText}>
                        <h1>Brawl it out!</h1>
                        <p>Your Reef Rascals are feisty little critters! They can brawl with one another!
                        The victor gets a fragment which can be used to get more Rascals!</p>
                    </div>
                </section>

                <section className={styles.rascalsContainer}>
                    <h1>Meet the Rascals</h1>
                    <p></p>
                </section>

            </div>
        </>
    )
}