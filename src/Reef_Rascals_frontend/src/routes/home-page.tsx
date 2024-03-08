import {useEffect, useState} from "react";
import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/home-page.module.scss";
import WoodButton from "../components/wood-btn";
import RascalCarousel from "../components/rascal-carousel";
import {useAuthContext} from "../middleware/middleware";
import {localStorage} from "../../index";

export default function HomePage() {
    const authContext = useAuthContext();
    const [principal, setPrincipal] = useState<string | null>(null);

    const getPrincipal = async () => {
        const principal = await localStorage.get("principal");
        if (principal != null) setPrincipal(principal);
    }

    useEffect(() => {
        getPrincipal()
        const handleScroll = () => {
            // parallax effect
            const backStoneImg = document.getElementById("backStoneImg");
            const midImg = document.getElementById("midImg");
            const logo = document.getElementById("logo");
            if (backStoneImg && midImg && logo) {
                let value = window.scrollY;
                backStoneImg.style.top = value * 0.5 + "px";
                midImg.style.top = value * 0.25 + "px";
                logo.style.top = value * 1 + "px";
            }

            // brawl parallax effect
            const scrollStart = 2 * window.innerHeight;
            const brawlSeaImg = document.getElementById("brawlSeaImg");
            if (window.scrollY > scrollStart) {
                if (brawlSeaImg) {
                    brawlSeaImg.style.top = (window.scrollY - scrollStart) * 0.5 + "px";
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goLogin = async () => {
        await authContext.login();
    };

    const goLogout = async () => {
        await authContext.logout();
    }

    return (
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <section className={styles.parallaxContainer}>
                    <img id="backSeaImg" src="/bg-parallax-back-sea.png" alt=""/>
                    <img id="backStoneImg" src="/bg-parallax-back-stone.png" alt=""/>
                    <img id="midImg" src="/bg-parallax-mid.png" alt=""/>
                    <img
                        id="lightImg"
                        className={styles.lightImg}
                        src="/bg-parallax-light.png"
                        alt=""
                    />
                    <img id="logo" className={styles.logo} src="/logo-full.png" alt=""/>
                    <img id="frontImg" src="/bg-parallax-front.png" alt=""/>
                    {authContext.principal == null ? (
                            <>
                                <div className={styles.loginBtn}>
                                    <WoodButton btnText="Login" onClick={goLogin}/>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <div className={styles.loginBtn}>
                                    <WoodButton btnText="Logout" onClick={goLogout}/>
                                </div>
                            </>
                        )
                    }
                </section>

                <section className={styles.introContainer}>
                    <h1>Introducing Reef Rascals</h1>
                    <p>
                        Reef Rascals is a game where you collect, battle and trade your
                        cute, pesky Rascals. Play this game long enough and you can also
                        gain fortune!
                    </p>
                    <p>Join us and have fun!</p>
                </section>

                <section className={styles.brawlContainer}>
                    <img
                        id="brawlSeaImg"
                        className={styles.brawlSeaImg}
                        src="/bg-brawl-sea.png"
                        alt=""
                    />
                    <img
                        id="brawlTopImg"
                        className={styles.brawlTopImg}
                        src="/bg-brawl-top.png"
                        alt=""
                    />
                    <img
                        id="brawlBottomImg"
                        className={styles.brawlBottomImg}
                        src="/bg-brawl-bottom.png"
                        alt=""
                    />
                    <span className={styles.brawlContent}>
            <div className={styles.brawlText}>
              <h1>Brawl it out!</h1>
              <p>
                Your Reef Rascals are feisty little critters! They can brawl
                with one another! The victor gets a fragment which can be used
                to get more Rascals!
              </p>
            </div>
            <div className={styles.brawlCharacter}></div>
          </span>
                </section>

                <section className={styles.rascalsContainer}>
                    <h1>Meet the Rascals</h1>
                    <RascalCarousel speed={40} flip={false}/>
                    <RascalCarousel speed={60} flip={true}/>
                    <RascalCarousel speed={40} flip={false}/>
                </section>
            </div>
        </>
    );
}
