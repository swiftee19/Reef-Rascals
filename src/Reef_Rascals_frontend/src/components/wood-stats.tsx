import styles from "../scss/components/wood-stats.module.scss";

export default function WoodStats({image, color, curr, max}: {image: string, color?: string, curr: number, max?: number}) {
    return (
        <div className={styles.woodContainer}>
            <img className={styles.background} src="/wood-stat.png" alt="" />
            <div className={`${styles.progressBar} ${color}`}>
                <div className={styles.progress}>
                    <p>{curr}{max && '/' + max}</p>
                </div>
            </div>
            <div className={styles.iconContainer}>
                <img className={styles.iconBack} src="/wood-plain-elipse.png" alt="" />
                <img className={styles.icon} src={image} />
            </div>
        </div>
    )
}