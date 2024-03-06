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

export default function RascalDetailPage() {
    const [isSell, setIsSell] = useState(false);
    const [rascal, setRascal] = useState<Rascal>({} as Rascal);
    const [isLoading, setIsLoading] = useState(true);
    const param = useParams();
    const rascalId = param.rascalId;
    const userId = useAuthContext().principal;

    const fetchRascal = async () => {
        if(rascalId) {
            const data = await matchmaking.getRascal(rascalId,userId);
            if(data) {
                setRascal(data[0]);
                setIsLoading(false);
            }
        }
    }

    const handleSell = () => {
        setIsSell(!isSell);
    }

    async function sellRascal(price: number) {
        rascal.price = price;
        matchmaking.sellRascal(rascal);
    }

    if(isLoading) {
        fetchRascal();
        return <LoadingPage/>
    }

    return(
        <>
            <SidebarNav/>
            <div className={styles.mainContainer}>
                <img className={styles.backgroundImg} src="/bg-aquarium.png"/>
                <div className={styles.backdropOverlay}/>
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
                                <RarityLabel rarity={rascal.rarity as Rarity} short={false}/>
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

                        <div className={styles.buyBtn}>
                            <p>Buy Now</p>
                        </div>

                        <div className={styles.retreiveBtn}>
                            <p>Retreive</p>
                        </div>

                        <div className={styles.ownerBtns}>
                            <div className={styles.buyBtn} onClick={handleSell}>
                                <p>Sell</p>
                            </div>
                            <div className={styles.retreiveBtn}>
                                <p>Exchange</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {
                isSell && <InputPriceModal closeModal={handleSell} sellRascal={sellRascal}/>
            }
        </>
    )
}