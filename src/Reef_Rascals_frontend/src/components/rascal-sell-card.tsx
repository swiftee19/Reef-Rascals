import { Rarity, Rascal } from "../types/rascal";
import styles from "../scss/components/rascal-sell-card.module.scss";
import RarityLabel from "./rarity-label";
import { useEffect, useState } from "react";
import InputPriceModal from "./input-price-modal";
import { matchmaking } from "../../../declarations/matchmaking";
import LoadingPage from "./loading-page";
import { Principal } from "@dfinity/principal";
import { useAuthContext } from "../middleware/middleware";

export default function RascalSellCard({rascal }: { rascal: Rascal }) {
    const [canisterId, setCanisterId] = useState("")
    const [isSell, setIsSell] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useAuthContext().principal;

    const gotoRascalDetail = () => {
        window.location.href = `/details/${rascal.id}/${canisterId}`;
    }

    const sellModal = () => {
        setIsSell(!isSell);
    }

    async function sellRascal(price: number) {
        const x = await matchmaking.sellRascal(rascal,price);
        if(x){
            window.location.reload();
            console.log("Rascal is sold", x);
        } else {
            console.log("Rascal is not sold", x);
        }
    }

    useEffect(() => {
        const currentRoute = window.location.href;
        const routeSplit = currentRoute.split("?");
        const tempCanisterId = routeSplit[1];
        setCanisterId("?" + tempCanisterId);
    }, []);

    async function getStatus() {
        const status = await matchmaking.checkRascalStatus(rascal, Principal.fromText(userId))
        if(status){
            if(status == "OnSale"){
                setIsLoading(false);
            }
        }
    }

    if(isLoading) {
        getStatus();
        return <div>Loading...</div>
    }
  
    return (
        <div className={styles.cardContainer} >
            <div className={styles.rascalImg}>
                <img  src={rascal.imageUrl} alt={rascal.name}/>
            </div>

            <section className={styles.cardAttribute}>
                <div className={styles.cardDetail}>
                <h2>{rascal.name}</h2>
                {/* {isSell &&
                    <span className={styles.cardPrice}>
                        <img src="/favicon.ico" alt="" />
                        <p>0.111</p>
                    </span>
                } */}
                </div>

                <div className={styles.cardStats}>
                <div>
                    <p className={styles.atkLbl}>ATK</p>
                    <p>{rascal.attack.toString()}</p>
                </div>
                <div>
                    <p className={styles.hpLbl}>HP</p>
                    <p>{rascal.health.toString()}</p>
                </div>
                <div>
                    <p className={styles.spdLbl}>SPD</p>
                    <p>{rascal.speed.toString()}</p>
                </div>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={`${styles.sellBtn} ${styles.greenBg}`} onClick={sellModal}>
                        {/* {isSell ? "Revert" : "Sell"} */}
                        Sell
                    </div>
                    <div className={`${styles.sellBtn} ${styles.greenBg}`} onClick={gotoRascalDetail}>
                        Detail
                    </div>
                </div>
            </section>

            <div className={styles.rarityLabel}>
                <RarityLabel rarity={rascal.rarity as Rarity} short={true}/>
            </div>

            {
                isSell &&
                <InputPriceModal closeModal={sellModal} sellRascal={sellRascal}/>
            }
        </div>
    )
}