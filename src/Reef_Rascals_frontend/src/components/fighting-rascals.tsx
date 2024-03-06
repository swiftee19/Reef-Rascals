import { Rascal } from "../types/rascal";
import styles from '../scss/components/fighting-rascals.module.scss';

export function FightingRascals({rascals, isFlipped, currRascal}: {rascals: Rascal[], isFlipped?: boolean, currRascal: Rascal}) {
    return (
        <div className={`${styles.rascalsContainer} ${isFlipped && styles.flip}`}>
            {
                rascals.slice().reverse().map((rascal) => {
                    return (
                        <div className={`${styles.rascalEggs} ${rascal === currRascal ? styles.currRascal : '' }`} key={rascal.id} >
                            <img className={styles.egg} src="/wood-plain-elipse.png" alt="" />
                            <img className={styles.rascal} src={rascal.imageUrl} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )

}