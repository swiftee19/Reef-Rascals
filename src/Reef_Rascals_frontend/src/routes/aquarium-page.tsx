import {MutableRefObject, Ref, RefObject, useEffect, useRef, useState} from "react";
import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import {gachaRascal, Rarity, Rascal, RascalType} from "../types/rascal";
import MyRascalPage from "./my-rascal-page";
import WoodStats from "../components/wood-stats";
import {useAuthContext} from "../middleware/middleware";
import {getCurrentUser} from "../types/auth";
import {User} from "../types/user";
import LoadingPage from "../components/loading-page";

export default function AquariumPage() {
    const eggGachaRef = useRef<HTMLImageElement | null>(null);

    const [isAquarium, setIsAquarium] = useState(true);
    const authContext = useAuthContext();
    const [principal, setPrincipal] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currUser, setCurrUser] = useState<User | null>(null);
    const [rascals, setRascals] = useState<Rascal[]>([]);
    const [isLoadingRascals, setIsLoadingRascals] = useState(true);
    const [showGachaModal, setShowGachaModal] = useState(false)
    const [glowAnimation, setGlowAnimation] = useState(false);
    const [isGettingNewRascalFromBackend, setIsGettingNewRascalFromBackend] = useState(false)
    const [gachaResult, setGachaResult] = useState<Rascal | null>(null)

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
        setGachaResult(null)
    };

    const removeEgg = () => {
        if (eggGachaRef.current) {
            eggGachaRef.current.style.display = "none";
        }
    }

    // Add an event listener to the entire document
    // document.addEventListener('click', function (event) {
    //     const clickedElement = event.target;
    //     if (!(clickedElement instanceof HTMLElement)) return;
    //     const className = clickedElement.className;
    //
    //     if (className === styles.gachaModalContainer) {
    //         handleCloseGachaModal();
    //     }
    // });

    const handleGacha = async () => {
        setGlowAnimation(true);
        setIsGettingNewRascalFromBackend(true)

        const gachaResult = await gachaRascal(authContext.principal)
        setGlowAnimation(false);
        removeEgg();
        setIsGettingNewRascalFromBackend(false)

        if (gachaResult) {
            const rascalResult = gachaResult as Rascal
            setGachaResult(rascalResult)
        }
    };

    if (isLoadingRascals) {
        userSetUp()
        return <LoadingPage/>
    }

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            event.preventDefault();
            const clickedElement = event.target;
            if (!(clickedElement instanceof HTMLElement)) return;
            const className = clickedElement.className;

            if (className === styles.gachaModalContainer) {
                handleCloseGachaModal();
            }
        };

        if (!isGettingNewRascalFromBackend) {
            document.addEventListener('click', clickHandler);
        }

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [isGettingNewRascalFromBackend]);

    return (
        <>
            {showGachaModal &&
                <>
                    <div className={`${styles.gachaModalContainer}`}>
                        <div className={styles.gachaModal}>
                            {
                                currUser?.raslet && currUser.raslet >= 10 ?
                                    <>
                                        <h1>Hatch your Rascal</h1>
                                        <img ref={eggGachaRef}
                                             className={`${glowAnimation ? "" : styles.egg} ${glowAnimation && styles.glowEffect}`}
                                             src="/rascal-egg.png" onClick={() => {
                                            handleGacha()
                                        }}/>
                                        (gachaResult &&
                                        <>
                                            <img className={styles.gachaResult} src={gachaResult?.imageUrl}
                                                 onClick={() => {
                                                     handleCloseGachaModal()
                                                 }}/>
                                        </>
                                        )
                                    </> :
                                    <>
                                        <h1 className={styles.invalidRasletText}>Not enough fragments ({currUser?.raslet.toString()}/10)</h1>
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
                    <img className={styles.eggButton} src="/rascal-egg.png"/>
                    <h2>Hatch</h2>
                </div>

                <section className={`${styles.myRascalPage} ${isAquarium ? "" : styles.slideUp}`}>
                    <MyRascalPage {...rascals as Array<Rascal>}/>
                </section>

                <header className={styles.aquariumTop}>
                    <SlideWoodBtn onToggle={togglePage} isAquarium={isAquarium}/>
                    <div className={styles.aquariumStats}>
                        <WoodStats image="/raslet.png" color="colors.$green-raslet" curr={Number(currUser?.raslet)} max={7}/>
                        <WoodStats image="/rascal-egg-top.png" curr={Number(currUser?.rascalFragment)} max={10}/>
                        <WoodStats image="/favicon.ico" curr={Number(currUser?.tokens)}/>
                    </div>
                </header>
            </div>
        </>
    )
}