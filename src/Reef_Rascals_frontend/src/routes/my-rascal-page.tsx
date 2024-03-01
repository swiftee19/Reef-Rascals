import RascalCard from '../components/rascal-card';
import styles from '../scss/pages/my-rascal-page.module.scss';
import { Rascal } from '../types/rascal';
import rascalList from '../types/rascals';

export default function MyRascalPage() {
    
    const rascals: Rascal[] = rascalList;

    return (
        <>
            <div className={styles.myRascalContainer}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.containerHeader}>My Rascals</h1>
                    <div className={styles.myRascals}>
                        {
                            rascals.map((rascal) => {
                                return <RascalCard brownTheme={true} key={rascal.id} rascal={rascal} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}