import { Rascal } from "../types/rascal";
import styles from '../scss/components/select-rascal.module.scss'

export default function SelectRascal({rascal}: {rascal: Rascal}) {
  return (
    <div className={styles.selectContainer}>
      <img src={rascal.imageUrl} alt={rascal.name} />
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
  )
}