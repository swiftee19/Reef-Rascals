import { Rascal } from "../types/rascal";
import styles from '../scss/components/fighting-rascals.module.scss';

export function FightingRascals({rascals, isFlipped}: {rascals: Rascal[], isFlipped?: boolean}) {
    return (
        <div className={`${styles.rascalsContainer} ${isFlipped && styles.flip}`}>
            {
                rascals.slice().reverse().map((rascal) => {
                    return (
                        <div className={styles.rascalEggs}>
                            <img className={styles.egg} src="/wood-plain-elipse.png" alt="" />
                            <img className={styles.rascal} src={rascal.imageUrl} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )

}