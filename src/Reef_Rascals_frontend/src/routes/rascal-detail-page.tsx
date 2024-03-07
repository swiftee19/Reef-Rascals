import { useState } from 'react';
import RarityLabel from '../components/rarity-label';
import SidebarNav from '../components/sidebar-nav';
import styles from '../scss/pages/rascal-detail-page.module.scss';
import { Rarity, Rascal } from '../types/rascal';
import rascalList from '../types/rascal-dummy';
import InputPriceModal from '../components/input-price-modal';
import { useParams } from 'react-router';
import { matchmaking } from '../../../declarations/matchmaking';
import { AuthContext, useAuthContext } from '../middleware/middleware';
import LoadingPage from '../components/loading-page';
import { Principal } from '@dfinity/principal';

export default function RascalDetailPage() {
    const [isSell, setIsSell] = useState(false);
    const [rascal, setRascal] = useState<Rascal>({} as Rascal);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const param = useParams();
    const rascalId = param.rascalId;
    const userId = useAuthContext().principal;

    const fetchRascal = async () => {
        if(rascalId) {
            const data = await matchmaking.getRascal(rascalId,Principal.fromText(userId));
            if(data) {
                setRascal(data[0]);
                const check = await matchmaking.checkRascalStatus(data[0],Principal.fromText(userId));
                if(check){
                    setStatus(check);
                    console.log("Rascal status", check);
                    setIsLoading(false);
                }
            } else {
                console.log("No rascal found", data);
            }
        } else {
            console.log("No rascalId found", rascalId);
        }
    }

    const handleSell = () => {
        setIsSell(!isSell);
    }

    async function sellRascal(price: number) {
        rascal.price = price;
        const x = await matchmaking.sellRascal(rascal,price);
        if(x){
            window.location.reload();
            console.log("Rascal is sold", x);
        } else {
            console.log("Rascal is not sold", x);
        }
    }

    async function buyRascal() {
        const x = await matchmaking.buyRacal(rascal,Principal.fromText(userId));
        if(x){
            window.location.reload();
            console.log("Rascal is bought", x);
        } else {
            console.log("Rascal is not bought", x);
        }
    }

    async function retreiveRascal() {
        const x = await matchmaking.retriveRascal(rascal);
        if(x){
            window.location.reload();
            console.log("Rascal is retreived", x);
        } else {
            console.log("Rascal is not retreived", x);
        }
    }

    async function handleExchange() {
        const x = await matchmaking.exchangeRascal(rascal);
        if(x){
            window.location.reload();
            console.log("Rascal is exchanged", x);
        } else {
            console.log("Rascal is not exchanged", x);
        }
    }

    if(isLoading) {
        fetchRascal();
        return <LoadingPage/>
    }

    return (
        <>
            <SidebarNav />
            <div className={styles.mainContainer}>
                <img className={styles.backgroundImg} src="/bg-aquarium.png" />
                <div className={styles.backdropOverlay} />
                <section className={styles.rascalContainer}>
                    <div className={styles.rascalImg}>
                        <img src={rascal.imageUrl} alt={rascal.name} />
                    </div>
    
                    <div className={styles.rascalDetail}>
                        <div className={styles.detailBox}>
                            <div className={styles.rascalIdentity}>
                                <h1>{rascal.name}</h1>
                                <p>{rascal.tribe}</p>
                                <p>#{rascal.id}</p>
                            </div>
                            <div className={styles.rarityContainer}>
                                <RarityLabel rarity={rascal.rarity as Rarity} short={false} />
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
                        </div>
    
                        {status === "sale" && (
                            <div className={styles.buyBtn} onClick={buyRascal}>
                                <p>Buy Now</p>
                            </div>
                        )}

                        { status === "owner" && (
                            <div className={styles.retreiveBtn} onClick={retreiveRascal}>
                                <p>Retreive</p>
                            </div>
                        )}
                        {status === "notSale" && (
                            <div className={styles.ownerBtns}>
                                <div className={styles.buyBtn} onClick={handleSell}>
                                    <p>Sell</p>
                                </div>
                                <div className={styles.retreiveBtn} onClick={handleExchange}>
                                    <p>Exchange</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
    
            {isSell && <InputPriceModal closeModal={handleSell} sellRascal={sellRascal} />}
        </>
    );
}