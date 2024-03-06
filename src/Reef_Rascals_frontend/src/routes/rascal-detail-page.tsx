import { useState } from 'react';
import RarityLabel from '../components/rarity-label';
import SidebarNav from '../components/sidebar-nav';
import styles from '../scss/pages/rascal-detail-page.module.scss';
import { Rarity } from '../types/rascal';
import rascalList from '../types/rascal-dummy';
import InputPriceModal from '../components/input-price-modal';

export default function RascalDetailPage() {
    const [isSell, setIsSell] = useState(false);
    const rascal = rascalList[0]

    const handleSell = () => {
        setIsSell(!isSell);
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
                isSell && <InputPriceModal closeModal={handleSell}/>
            }
        </>
    )
}