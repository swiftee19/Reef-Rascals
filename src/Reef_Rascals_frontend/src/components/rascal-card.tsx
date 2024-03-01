import { Rarity, Rascal } from "../types/rascal";
import styles from "../scss/components/rascal-card.module.scss";
import RarityLabel from "./rarity-label";

export default function RascalCard({ rascal, brownTheme }: { rascal: Rascal, brownTheme?: boolean }) {
    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.cardTop} ${brownTheme && styles.brownGradient}`}>
                <img className={styles.rascalImg} src={rascal.imageUrl} alt={rascal.name}/>

                <div className={`${styles.cardPrice} ${brownTheme && styles.brownTheme}`}>
                    <img src="/favicon.ico" alt="" />
                    <p>0.111</p>
                </div>

                <div className={styles.cardRarity}>
                    <RarityLabel rarity={rascal.rarity as Rarity}/>
                </div>
            </div>

            <div className={`${styles.cardBottom} ${brownTheme && styles.brownTheme}`}>
                <div className={`${styles.cardDetail} ${brownTheme ? styles.brownTheme : styles.blueTheme}`}>
                    <h1>{rascal.name}</h1>
                    <p>{rascal.tribe}</p>
                    <p>{rascal.id}</p>
                </div>

                <div className={`${styles.cardStats} ${brownTheme ? styles.brownTheme : styles.blueTheme}`}>
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
        </div>
    )
}