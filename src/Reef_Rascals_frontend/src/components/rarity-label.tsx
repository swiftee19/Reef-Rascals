import { Rarity } from "../types/rascal";
import styles from "../scss/components/rarity-label.module.scss";
import { useEffect, useState } from "react";

export default function RarityLabel({ rarity }: { rarity: Rarity }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const rarityType = (): string => {
    if (windowWidth <= 1500) {
      return rarity.charAt(0);
    } else {
      return rarity;
    }
  }

  return (
    <div className={rarityColor(rarity)}>
      <p className={windowWidth <= 1500 ? styles.shortLabel : ''}>
        {rarityType()}
      </p>
    </div>
  )
}
