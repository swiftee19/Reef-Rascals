import { Rarity, Rascal } from "../types/rascal";
import styles from "../scss/components/rascal-rank-card.module.scss";
import RarityLabel from "./rarity-label";

export default function RascalRankCard({ index, rascal }: { index: number, rascal: Rascal }) {
  
  const gotoRascalDetail = () => {
    window.location.href = `/details/${rascal.id}`;
  }
  
  return (
    <div className={styles.cardContainer} onClick={gotoRascalDetail}>
      <div className={styles.rankNumber}>
        <h1>{index + 1}</h1>
      </div>

      <div className={styles.rascalImg}>
        <img  src={rascal.imageUrl} alt={rascal.name}/>
      </div>

      <section className={styles.cardAttribute}>
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
      </section>

      <div className={styles.rarityLabel}>
        <RarityLabel rarity={rascal.rarity as Rarity} short={true}/>
      </div>
    </div>
  )
}