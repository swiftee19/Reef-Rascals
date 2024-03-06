import styles from '../scss/components/progress-bar.module.scss';

export default function ProgressBar({ progress, maximum}: { progress: number, maximum: number }) {
    const progressPercentage = (progress / maximum) * 100;
  
    return (
    <div className={styles.progressContainer}>
      <div className={styles.progress} style={{width: progress + '%'}}>
      </div>
    </div>
  );
}