import styles from "../scss/components/wood-stats.module.scss";

export default function WoodStats({image}: {image: string}) {
    return (
        <div className={styles.woodContainer}>
            <img className={styles.background} src="/wood-stat.png" alt="" />
            <img className={styles.icon} src={image} />
        </div>
    )
}