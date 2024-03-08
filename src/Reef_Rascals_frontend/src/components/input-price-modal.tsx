import Modal from "./modal";
import styles from '../scss/components/input-price-modal.module.scss';
import { useState } from "react";

export default function InputPriceModal({closeModal, sellRascal}: {closeModal: () => void, sellRascal: (price: number) => void}){

    const [price, setPrice] = useState<number>(0);

    return (
        <Modal closeModal={closeModal} w="30%">
            <h1 className={styles.title}>Input Price</h1>
            <input className={styles.inputPrice} type="number" placeholder="Input price..." onChange={(event)=> {
                setPrice(Number(event.target.value));
            }}/>
            <div className={styles.buttonContainer}>
                <div className={styles.cancelBtn}>
                    Cancel
                </div>
                <div className={styles.sellBtn} onClick={()=> {
                    sellRascal(price);
                }}>
                    Sell
                </div>
            </div>
        </Modal>
    )
}