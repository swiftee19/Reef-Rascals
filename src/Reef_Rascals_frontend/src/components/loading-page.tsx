import styles from '../scss/components/loading-page.module.scss';

export default function LoadingPage() {
    return (
        <>
            <div className={styles.mainContainer}>
                <img className={styles.backdrop} src="/bg-aquarium.png" alt={"Image not found"}/>
                <img className={styles.bouncingImage} src="/rascals/gloomy-bob.png" alt={"Image not found"}/>
                <h1 unselectable={"on"} className={styles.loadingText}>Loading...</h1>
            </div>
        </>
    )
}