import { Rarity } from "../types/rascal";
import styles from "../scss/components/rarity-label.module.scss";

export default function RarityLabel({ rarity }: { rarity: Rarity }) {
  const rarityColor = (rarity: Rarity): string => {
    switch (rarity) {
      case Rarity.Common:
        return styles.common;
      case Rarity.Rare:
        return styles.rare;
      case Rarity.Epic:
        return styles.epic;
      case Rarity.Legend:
        return styles.legend;
      default:
        return styles.common;
    }
  }
  return (
    <div className={rarityColor(rarity)}>
      <p>{rarity}</p>
    </div>  
  )
}