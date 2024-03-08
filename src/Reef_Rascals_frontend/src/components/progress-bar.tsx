import styles from '../scss/components/progress-bar.module.scss';

export default function ProgressBar({ progress, maximum, isFlipped}: { progress: number, maximum: number, isFlipped?: boolean}) {
    progress = progress < 0 ? 0 : progress;
    const progressPercentage = Math.round((progress / maximum) * 100);
    console.log(progress, maximum, progressPercentage);

    return (
    <div className={styles.progressContainer}>
      <div className={`${styles.progress} ${isFlipped ? styles.redBar : styles.greenBar}`} style={{width: progressPercentage + '%'}}>
      </div>
    </div>
  );
}