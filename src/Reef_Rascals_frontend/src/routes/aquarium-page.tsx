import {useEffect, useState} from "react";
import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import MyRascalPage from "./my-rascal-page";
import WoodStats from "../components/wood-stats";
import {useAuthContext} from "../middleware/middleware";
import {getCurrentUser} from "../types/auth";
import {User} from "../types/user";
import LoadingPage from "../components/loading-page";

export default function AquariumPage() {
    const [isAquarium, setIsAquarium] = useState(true);
    const authContext = useAuthContext();
    const [principal, setPrincipal] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currUser, setCurrUser] = useState<User | null>(null);
    const [rascals, setRascals] = useState<Rascal[]>([]);
    const [isLoadingRascals, setIsLoadingRascals] = useState(true);
    const [showGachaModal, setShowGachaModal] = useState(false)

    async function userSetUp() {
        const user = await getCurrentUser()
        if (user) {
            setCurrUser(user)
            setRascals(user.rascals)
            setIsLoadingRascals(false)
            console.log("rascals", user.rascals)
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

    const handleShowGacha = () => {
        setShowGachaModal(true)
    }

    const handleCloseGachaModal = () => {
        setShowGachaModal(false);
    };

    // Add an event listener to the entire document
    document.addEventListener('click', function (event) {
        const clickedElement = event.target;
        if (!(clickedElement instanceof HTMLElement)) return;
        const className = clickedElement.className;

        if (className === styles.gachaModalContainer) {
            handleCloseGachaModal();
        }
    });

    if(isLoadingRascals) {
        userSetUp()
        return <LoadingPage/>
    }

    return (
        <>
            {showGachaModal &&
                <>
                    <div className={styles.gachaModalContainer}>
                        <div className={styles.gachaModal}>
                            {
                                currUser?.raslet && currUser.raslet >= 10 ?
                                    <>
                                        <h1>Hatch your Rascal</h1>
                                        <img className={styles.egg} src="/rascal-egg.png"/>
                                    </> :
                                    <>
                                        <h1 className={styles.invalidRasletText}>Not enough raslet</h1>
                                        <div className={styles.invalidRasletSymbolContainer}>
                                            <img className={styles.invalidEggTop} src="/rascal-egg-top.png"/>
                                            <img className={styles.invalidEggBottom} src="/rascal-egg-bottom.png"/>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </>
            }

            <SidebarNav/>
            <div className={styles.mainContainer}>
                <img className={styles.background} src="/bg-aquarium.png"/>
                <AquariumCanvas rascals={rascals}/>

                <footer className={styles.aquariumBottom} onClick={(e) => {
                    findMatch();
                }}>
                    <img src="/wood-round.png" alt=""/>
                </footer>

                <div className={styles.gachaButton} onClick={() => {
                    handleShowGacha()
                }}>
                    <img className={styles.background} src="/wood-plain-elipse.png"/>
                    <img className={styles.egg} src="/rascal-egg.png"/>
                    <h2>Hatch</h2>
                </div>

                <section className={`${styles.myRascalPage} ${isAquarium ? "" : styles.slideUp}`}>
                    <MyRascalPage {...rascals as Array<Rascal>}/>
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