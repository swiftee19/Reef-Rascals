import RascalCard from '../components/rascal-card';
import styles from '../scss/pages/my-rascal-page.module.scss';
import { Rascal } from '../types/rascal';

export default function MyRascalPage({inputRascals}: {inputRascals: Rascal[]}) {
    const rascals = inputRascals;
    // const rascals = rascalList;
    console.log("rascals array:", rascals);
    return (
        <>
            <div className={styles.myRascalContainer}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.containerHeader}>My Rascals</h1>
                    { rascals.length > 0 ? 
                    <div className={styles.myRascals}>
                        {
                            rascals.map((rascal:Rascal) => {
                                return <RascalCard brownTheme={true} key={rascal.id} rascal={{...rascal}} />
                            })
                        }
                    </div>
                    :
                    <div className={styles.noRascal}>
                        <img src="/rascals/gloomy-bob.png" alt="" />
                        <p>You currently have no rascals. Hatch to get your first one!</p>
                    </div>
                    }
                </div>
            </div>
        </>
    );
}