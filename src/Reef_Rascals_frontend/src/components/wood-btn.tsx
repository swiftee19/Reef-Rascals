import styles from "../scss/components/wood-btn.module.scss";

export default function WoodButton ({btnText, onClick}: {btnText: string, onClick: () => void}){
    return (
        <div className={styles.woodBtn} onClick={onClick}>
            <img src="/wood-button.png" alt="" />
            <p>{btnText}</p>
        </div>
    )
}
