import { Rascal } from "../types/rascal";
import styles from "../scss/components/rascal-card.module.scss";

export default function RascalCard({ rascal }: { rascal: Rascal }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardTop}>
                <img src={rascal.imageUrl} alt={rascal.name}/>
            </div>

            <div className={styles.cardPrice}>
                <p>0.111</p>
            </div>

            <div className={styles.cardBottom}>
                <div className={styles.cardDetail}>
                    <h3>{rascal.name}</h3>
                    <p>{rascal.type}</p>
                    <p>{rascal.id}</p>
                </div>

                <div className={styles.cardStats}>
                    <div>
                        <p className={styles.atkLbl}>ATK</p>
                        <p>{rascal.attack}</p>
                    </div>
                    <div>
                        <p className={styles.hpLbl}>HP</p>
                        <p>{rascal.health}</p>
                    </div>
                    <div>
                        <p className={styles.spdLbl}>SPD</p>
                        <p>{rascal.speed}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}