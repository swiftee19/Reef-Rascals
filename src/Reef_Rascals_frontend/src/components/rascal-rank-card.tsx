import { Rascal } from "../types/rascal";
import styles from "../scss/components/rascal-rank-card.module.scss";
import RarityLabel from "./rarity-label";

export default function RascalRankCard({ index, rascal }: { index: number, rascal: Rascal }) {
  return (
    <div className={styles.cardContainer}>
      <h1>{index + 1}</h1>

      <img className={styles.rascalImg} src={rascal.imageUrl} alt={rascal.name}/>

      <div className={styles.cardDetail}>
        <h2>{rascal.name}</h2>
        <span className={styles.cardPrice}>
          <img src="/favicon.ico" alt="" />
          <p>0.111</p>
        </span>
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

      <div className={styles.rarityLabel}>
        <RarityLabel rarity={rascal.rarity} />
      </div>
    </div>
  )
}