import { useState } from "react";
import styles from "../scss/components/sell-modal.module.scss";
import rascalList from "../types/rascal-dummy";
import RascalSellCard from "./rascal-sell-card";
import Modal from "./modal";
import { Rascal } from "../types/rascal";

export default function SellModal({closeModal, rascals}: {closeModal: () => void, rascals: Rascal[]}) {

    const myRascals = rascals;

    return(
        <Modal closeModal={closeModal} w="70%" h="50%">
            <h1 className={styles.title}>Choose Rascal to Sell</h1>
            { myRascals.length > 0 ?
            <div className={styles.cardContainer}>
                {
                    myRascals.map((rascal) => (
                        <RascalSellCard key={rascal.id} rascal={rascal} />
                    ))
                }
            </div>
            :
            <div className={styles.noRascal}>
                You currently have no rascals to sell!
            </div>
            }
        </Modal>
    )
}