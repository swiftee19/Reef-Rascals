import {useEffect, useRef, useState} from "react";
import AquariumCanvas from "../components/aquarium-canvas";
import SidebarNav from "../components/sidebar-nav";
import SlideWoodBtn from "../components/slide-wood-btn";
import styles from "../scss/pages/aquarium-page.module.scss";
import {
    gachaRascal,
    getRarityFromString,
    Rarity,
    Rascal,
    setUserAttackRascal,
    setUserDefenseRascal
} from "../types/rascal";
import MyRascalPage from "./my-rascal-page";
import WoodStats from "../components/wood-stats";
import {useAuthContext} from "../middleware/middleware";
import {getCurrentUser} from "../types/auth";
import {User} from "../types/user";
import {matchmaking} from "../../../declarations/matchmaking";
import Modal from "../components/modal";
import RarityLabel from "../components/rarity-label";
import LoadingPage from "../components/loading-page";

export default function AquariumPage() {
    const eggGachaRef = useRef<HTMLImageElement | null>(null);

    const [isAquarium, setIsAquarium] = useState(true);
    const authContext = useAuthContext();
    const [principal, setPrincipal] = useState<string | null>(null);
    const [currUser, setCurrUser] = useState<User | null>(null);
    const [oppUser, setOppUser] = useState<User | null>(null);
    const [rascals, setRascals] = useState<Rascal[]>([]);
    const [isLoadingRascals, setIsLoadingRascals] = useState(true);
    const [showGachaModal, setShowGachaModal] = useState(false)
    const [glowAnimation, setGlowAnimation] = useState(false);
    const [isGettingNewRascalFromBackend, setIsGettingNewRascalFromBackend] = useState(false)
    const [gachaResult, setGachaResult] = useState<Rascal | null>(null)

    const [showSelectBattleRascalModalIsOpen, setShowSelectBattleRascalModalIsOpen] = useState(false)
    const [showRascalSelectionForBattleContainer, setShowRascalSelectionForBattleContainer] = useState(false)
    const [availableRascalsForBattle, setAvailableRascalsForBattle] = useState<Rascal[]>([])
    const [selectedBattleRascalContainer, setSelectedBattleRascalContainer] = useState(1)
    const [battleRascal1, setBattleRascal1] = useState<Rascal | null>(null)
    const [battleRascal2, setBattleRascal2] = useState<Rascal | null>(null)
    const [battleRascal3, setBattleRascal3] = useState<Rascal | null>(null)

    const [showSelectDefenseRascalModalIsOpen, setShowSelectDefenseRascalModalIsOpen] = useState(false)
    const [showRascalSelectionContainerForDefense, setShowRascalSelectionContainerForDefense] = useState(false)
    const [availableRascalsForDefense, setAvailableRascalsForDefense] = useState<Rascal[]>([])
    const [selectedDefenseRascalContainer, setSelectedDefenseRascalContainer] = useState(1)
    const [defenseRascal1, setDefenseRascal1] = useState<Rascal | null>(null)
    const [defenseRascal2, setDefenseRascal2] = useState<Rascal | null>(null)
    const [defenseRascal3, setDefenseRascal3] = useState<Rascal | null>(null)
    const [isSavingUserDefenseRascals, setIsSavingUserDefenseRascals] = useState(false)

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

    const findMatch = async () => {
        if (currUser) {
            const data = await matchmaking.getOpponents(currUser)
            if (data) {
                console.log("opponent", data)
                const opponent = data[0]
                const currentRoute = window.location.href;
                const routeSplit = currentRoute.split("?")
                const tempCanisterId = routeSplit[1];
                const canisterId = "?" + tempCanisterId
                window.location.href = "/match/" + opponent.id + "/" + canisterId;
            } else {
                console.log("No opponent found", data)
            }
        }
    }

    const handleShowGacha = () => {
        setShowGachaModal(true)
    }

    const handleCloseGachaModal = () => {
        setShowGachaModal(false);
        setGachaResult(null);
        window.location.reload()
    };

    const handleOpenSelectBattleRascalModal = () => {
        setShowSelectBattleRascalModalIsOpen(true)
    }
    const handleCloseSelectBattleRascalModal = () => {
        setShowSelectBattleRascalModalIsOpen(false)
        setShowRascalSelectionForBattleContainer(false)
    }
    const toggleRascalSelectionModalForBattle = () => {
        if (showRascalSelectionForBattleContainer) {
            setShowRascalSelectionForBattleContainer(false)
        } else {
            setShowRascalSelectionForBattleContainer(true)
        }
    }

    const toggleRascalSelectionModalForDefense = () => {
        if (showRascalSelectionContainerForDefense) {
            setShowRascalSelectionContainerForDefense(false)
        } else {
            setShowRascalSelectionContainerForDefense(true)
        }
    }

    const handleSelectBattleRascalContainerForAttack = (containerNumber: number) => {
        setSelectedBattleRascalContainer(containerNumber)
    }

    const handleSelectBattleRascalContainerForDefense = (containerNumber: number) => {
        setSelectedDefenseRascalContainer(containerNumber)
    }

    const removeEgg = () => {
        if (eggGachaRef.current) {
            eggGachaRef.current.style.display = "none";
        }
    }

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

    async function getOpponent() {
        if (currUser) {
            const data = await matchmaking.getOpponents(currUser);
            if (data) {
                const opponent = data[Math.floor(Math.random() * data.length)];
                setOppUser(opponent);
            }
        }
    }

    useEffect(() => {
        const allRascals = currUser?.rascals
        const userBattleRascals = currUser?.attack
        const userDefenseRascals = currUser?.defense

        if (allRascals && userBattleRascals) {
            setBattleRascal1(userBattleRascals[0])
            setBattleRascal2(userBattleRascals[1])
            setBattleRascal3(userBattleRascals[2])
        }

        if (allRascals && userDefenseRascals) {
            setDefenseRascal1(userDefenseRascals[0])
            setDefenseRascal2(userDefenseRascals[1])
            setDefenseRascal3(userDefenseRascals[2])
        }
    }, [currUser]);

    useEffect(() => {
        const allRascals = currUser?.rascals

        if (allRascals) {
            const filteredRascals = allRascals.filter(rascal => rascal.id !== battleRascal1?.id && rascal.id !== battleRascal2?.id && rascal.id !== battleRascal3?.id)
            setAvailableRascalsForBattle(filteredRascals)
        }
    }, [battleRascal1, battleRascal2, battleRascal3]);

    useEffect(() => {
        const allRascals = currUser?.rascals

        if (allRascals) {
            const filteredRascals = allRascals.filter(rascal => rascal.id !== defenseRascal1?.id && rascal.id !== defenseRascal2?.id && rascal.id !== defenseRascal3?.id)
            setAvailableRascalsForDefense(filteredRascals)
        }
    }, [defenseRascal1, defenseRascal2, defenseRascal3]);

    const handleStartFight = async () => {
        if (!battleRascal1 && !battleRascal2 && !battleRascal3) {
            return
        }
        await setUserAttackRascal(authContext.principal, battleRascal1, battleRascal2, battleRascal3)
        findMatch();
    }

    const handleSaveDefenseRascals = async () => {
        setUserDefenseRascal(authContext.principal, defenseRascal1, defenseRascal2, defenseRascal3).then((result) => {
            setIsSavingUserDefenseRascals(false)
        })
    }

    if (isLoadingRascals) {
        userSetUp()
        return <LoadingPage/>
    }

    // const dummyRascals: Rascal[] = rascalList

    return (
        <>
            <SidebarNav/>
            {
                showGachaModal &&
                <>
                    <div className={`${styles.gachaModalContainer}`}>
                        <div className={styles.gachaModal}>
                            {
                                currUser?.rascalFragment && currUser.rascalFragment >= 10 ?
                                    <>
                                        <h1>Hatch your Rascal</h1>
                                        <img ref={eggGachaRef}
                                             className={`${glowAnimation ? "" : styles.egg} ${glowAnimation && styles.glowEffect}`}
                                             src="/rascal-egg.png" onClick={() => {
                                            handleGacha()
                                        }}/>
                                        {(
                                            gachaResult &&
                                            <>
                                                <div className={styles.gachaResultContainer}>
                                                    <div className={styles.gachaResult}>
                                                        <img className={styles.gachaResult} src={gachaResult?.imageUrl}
                                                             onClick={() => {
                                                                 handleCloseGachaModal()
                                                             }}/>
                                                        <div className={styles.rarity}>
                                                            <RarityLabel
                                                                rarity={getRarityFromString(gachaResult.rarity)}
                                                                short={false}/>
                                                        </div>
                                                    </div>
                                                    <div className={styles.gachaResultStatsContainer}>
                                                        <h2>{gachaResult.name}</h2>
                                                        <div>
                                                            <p className={styles.atkLbl}>ATK</p>
                                                            <p>{gachaResult?.attack.toString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className={styles.hpLbl}>HP</p>
                                                            <p>{gachaResult?.health.toString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className={styles.spdLbl}>SPD</p>
                                                            <p>{gachaResult?.speed.toString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </> :
                                    <>
                                        <h1 className={styles.invalidRasletText}>Not enough fragments
                                            ({currUser?.raslet.toString()}/10)</h1>
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
            {
                showSelectBattleRascalModalIsOpen &&
                <>
                    <Modal w={"50%"} h={"50%"} closeModal={() => {
                        handleCloseSelectBattleRascalModal();
                    }}>
                        <div className={styles.selectBattleRascalMainContainer}>
                            <h1>Select your Rascals</h1>
                            <div className={styles.selectedRascalsContainer}>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForBattle()
                                    handleSelectBattleRascalContainerForAttack(1)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {battleRascal1 &&
                                        <img className={styles.selectedRascal} src={battleRascal1.imageUrl}/>
                                    }
                                </div>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForBattle()
                                    handleSelectBattleRascalContainerForAttack(2)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {battleRascal2 &&
                                        <img className={styles.selectedRascal} src={battleRascal2.imageUrl}/>
                                    }
                                </div>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForBattle()
                                    handleSelectBattleRascalContainerForAttack(3)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {battleRascal3 &&
                                        <img className={styles.selectedRascal} src={battleRascal3.imageUrl}/>
                                    }
                                </div>
                            </div>
                            <div className={styles.brawlButton} onClick={() => {
                                handleStartFight()
                            }}>
                                <img src="/wood-button.png"/>
                                <h1>Brawl!</h1>
                            </div>
                        </div>
                    </Modal>
                    <div
                        className={`${styles.availableRascalsContainer} ${showRascalSelectionForBattleContainer ? styles.showAvailableRascalsContainer : ''}`}>
                        {
                            availableRascalsForBattle.map((rascal, index) => {
                                return (
                                    <img src={rascal.imageUrl} onClick={() => {
                                        if (selectedBattleRascalContainer === 1) {
                                            setBattleRascal1(rascal)
                                        } else if (selectedBattleRascalContainer === 2) {
                                            setBattleRascal2(rascal)
                                        } else if (selectedBattleRascalContainer === 3) {
                                            setBattleRascal3(rascal)
                                        }
                                        setShowRascalSelectionForBattleContainer(false)
                                    }}/>
                                )
                            })
                        }
                    </div>
                </>
            }
            {
                showSelectDefenseRascalModalIsOpen &&
                <>
                    <Modal w={"50%"} h={"50%"} closeModal={() => {
                        setShowSelectDefenseRascalModalIsOpen(false);
                    }}>
                        <div className={styles.selectBattleRascalMainContainer}>
                            <h1>Select your Defender Rascals</h1>
                            <div className={styles.selectedRascalsContainer}>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForDefense()
                                    handleSelectBattleRascalContainerForDefense(1)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {defenseRascal1 &&
                                        <img className={styles.selectedRascal} src={defenseRascal1.imageUrl}/>
                                    }
                                </div>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForDefense()
                                    handleSelectBattleRascalContainerForDefense(2)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {defenseRascal2 &&
                                        <img className={styles.selectedRascal} src={defenseRascal2.imageUrl}/>
                                    }
                                </div>
                                <div className={styles.selectedRascalContainer} onClick={() => {
                                    toggleRascalSelectionModalForDefense()
                                    handleSelectBattleRascalContainerForDefense(3)
                                }}>
                                    <img className={styles.rascalWoodenBackground} src="/wood-plain-elipse.png"/>
                                    {defenseRascal3 &&
                                        <img className={styles.selectedRascal} src={defenseRascal3.imageUrl}/>
                                    }
                                </div>
                            </div>
                            <div className={styles.brawlButton} onClick={() => {
                                setIsSavingUserDefenseRascals(true)
                                handleSaveDefenseRascals()
                            }}>
                                <img src="/wood-button.png"/>
                                {isSavingUserDefenseRascals ?
                                    <h1>Saving...</h1> :
                                    <h1>Save</h1>
                                }
                            </div>
                        </div>
                    </Modal>
                    <div
                        className={`${styles.availableRascalsContainer} ${showRascalSelectionContainerForDefense ? styles.showAvailableRascalsContainer : ''}`}>
                        {
                            availableRascalsForDefense.map((rascal, index) => {
                                return (
                                    <img src={rascal.imageUrl} onClick={() => {
                                        if (selectedDefenseRascalContainer === 1) {
                                            setDefenseRascal1(rascal)
                                        } else if (selectedDefenseRascalContainer === 2) {
                                            setDefenseRascal2(rascal)
                                        } else if (selectedDefenseRascalContainer === 3) {
                                            setDefenseRascal3(rascal)
                                        }
                                        setShowRascalSelectionContainerForDefense(false)
                                    }}/>
                                )
                            })
                        }
                    </div>
                </>
            }
            <div className={styles.mainContainer}>
                <img className={styles.background} src="/bg-aquarium.png"/>
                <AquariumCanvas rascals={rascals}/>

                <footer className={styles.aquariumBottom}>
                    <div className={styles.openDefenseModalButton} onClick={(e) => {
                        e.preventDefault();
                        setShowSelectDefenseRascalModalIsOpen(true)
                    }}>
                        <img src="/wood-plain-elipse.png" alt=""/>
                        <img className={styles.shieldIcon} src="/shield-icon.svg"/>
                    </div>
                    <img className={styles.playButton} src="/wood-round.png" alt="" onClick={(e) => {
                        e.preventDefault();
                        handleOpenSelectBattleRascalModal();
                    }}/>
                </footer>

                <div className={styles.gachaButton} onClick={() => {
                    handleShowGacha()
                }}>
                    <img className={styles.background} src="/wood-plain-elipse.png"/>
                    <img className={styles.eggButton} src="/rascal-egg.png"/>
                    <h2>Hatch</h2>
                </div>

                <section className={`${styles.myRascalPage} ${isAquarium ? "" : styles.slideUp}`}>
                    <MyRascalPage inputRascals={currUser?.rascals!}/>
                </section>

                <header className={styles.aquariumTop}>
                    <SlideWoodBtn onToggle={togglePage} isAquarium={isAquarium}/>
                    <div className={styles.aquariumStats}>
                        <WoodStats image="/raslet.png" color="colors.$green-raslet" curr={Number(currUser?.raslet)}
                                   max={7}/>
                        <WoodStats image="/rascal-egg-top.png" curr={Number(currUser?.rascalFragment)}/>
                        <WoodStats image="/favicon.ico" curr={Number(currUser?.tokens)}/>
                    </div>
                </header>
            </div>
        </>
    )
}