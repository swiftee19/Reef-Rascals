import React, { useState } from 'react';
import styles from '../scss/components/slide-wood-btn.module.scss';
import WoodButton from './wood-btn';

export default function SlideWoodBtn({onToggle, isAquarium}: {onToggle: () => void, isAquarium: boolean}){
    return (
        <div className={styles.backSlider}>
            <h1 onClick={onToggle} style={{cursor: 'pointer'}}>Aquarium</h1>
            <h1 onClick={onToggle} style={{cursor: 'pointer'}}>My Rascals</h1>

            <div id='movingBtn' className={`${styles.movingBtn} ${isAquarium ? '' : styles.slide}`} >
                <WoodButton btnText={isAquarium ? "Aquarium" : "My Rascals"} onClick={() => {}}/>
            </div>
        </div>
    );
}
