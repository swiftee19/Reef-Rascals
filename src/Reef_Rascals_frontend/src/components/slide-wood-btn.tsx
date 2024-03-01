import styles from "../scss/components/slide-wood-btn.module.scss";
import WoodButton from "./wood-btn";

export default function SlideWoodBtn() {
    const togglePage = () => {

    }

    return(
        <div className={styles.backSlider}>
            <h1>Aquarium</h1>
            <h1>My Rascals</h1>

            <div className={styles.movingBtn}>
                <WoodButton btnText="Aquarium" onClick={togglePage}/>
            </div>
        </div>
    )
}