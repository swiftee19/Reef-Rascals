import { Rarity } from "../types/rascal";

export default function RarityLabel({ rarity }: { rarity: Rarity }) {
  return (
    <div>
      <p>{rarity}</p>
    </div>  
  )
}