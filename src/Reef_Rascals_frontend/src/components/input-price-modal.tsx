import Modal from "./modal";
import styles from '../scss/components/input-price-modal.module.scss';
import { Rascal } from "../types/rascal";

export default function InputPriceModal({closeModal}: {closeModal: () => void}){

    return (
        <Modal closeModal={closeModal} w="30%" h="35%">
            <h1 className={styles.title}>Input Price</h1>
            <input className={styles.inputPrice} type="number" placeholder="Input price..."/>
            <div className={styles.buttonContainer}>
                <div className={styles.cancelBtn}>
                    Cancel
                </div>
                <div className={styles.sellBtn}>
                    Sell
                </div>
            </div>
        </Modal>
    )
}