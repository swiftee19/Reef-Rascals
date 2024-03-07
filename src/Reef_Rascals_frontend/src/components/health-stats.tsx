import styles from '../scss/components/health-stats.module.scss';
import ProgressBar from './progress-bar';

export default function HealthStats({progress, maximum, isFlipped}: {progress: number, maximum: number, isFlipped?: boolean}) {
  
  return (
    <div className={`${styles.statContainer} ${isFlipped && styles.flip}`} >
        <div className={styles.stat}>
            <img src="/wood-stat-long.png" alt="" />
            <div className={styles.healthBar}>
                <ProgressBar progress={progress} maximum={maximum} isFlipped={isFlipped} />
            </div>
        </div>
        <img className={styles.currRascal} src="/wood-plain-elipse.png" alt="" />
    </div>
  );
}