import styles from "../scss/components/battle-history-card.module.scss"
import {BattleHistory, BattleResult} from "../types/battle-history";

export default function BattleHistoryCard({battleHistory}: { battleHistory: BattleHistory }) {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer}>
                    {battleHistory.result == BattleResult.Win ?
                        <>
                            <div className={styles.victoryRibbon}>
                                <img src="/crown-icon.svg"/>
                                <p>
                                    Victory
                                </p>
                            </div>
                        </> :
                        <>
                            <div className={styles.defeatRibbon}>
                                <img src="/skull-icon.svg"/>
                                <p>
                                    Defeat
                                </p>
                            </div>
                        </>}
                    <div className={styles.opponentInfoContainer}>
                        <h2>{battleHistory.opponent.username}</h2>
                        <p>Opponent ID: {battleHistory.opponent.id.toString()}</p>
                    </div>
                </div>
                <p className={styles.time}>{new Date(battleHistory.date).toLocaleDateString()} {new Date(battleHistory.date).toLocaleTimeString()}</p>
                <div className={styles.rascalsContainer}>
                    <div className={styles.rascalsLeftContainer}>
                        {battleHistory.usedRascal.map((rascal, index) =>
                            <>
                                <img src={rascal.imageUrl}/>
                            </>
                        )}
                    </div>
                    <h2>VS</h2>
                    <div className={styles.rascalsRightContainer}>
                        {battleHistory.opponentRascal.map((rascal, index) =>
                            <>
                                <img src={rascal.imageUrl}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}