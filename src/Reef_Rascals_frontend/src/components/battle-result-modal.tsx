import styles from '../scss/components/battle-result-modal.module.scss';
import { Rascal } from '../types/rascal';
import Modal from './modal';

export default function BattleResultModal({closeModal, battleEnd, rascals}: {closeModal: () => void, battleEnd: string | null, rascals: Rascal[]}){
  const fragment = 1;
  
  return (
    <Modal w='30%' h='40%' closeModal={closeModal}>
      <h1 className={styles.title}>{battleEnd === 'Win' ? 'Victory' : 'Defeat'}</h1>
      <p className={styles.content}>You've {battleEnd === 'Win' ? "won" : 'lost'} the battle!</p>
      <div className={styles.rascalsContainer}>
        {
            rascals.slice().reverse().map((rascal) => {
                return (
                    <div className={styles.rascalEggs} key={rascal.id} >
                        <img className={styles.egg} src="/rascal-egg.png" alt="" />
                        <img className={styles.rascal} src={rascal.imageUrl} alt="" />
                    </div>
                )
            })
        }
      </div>
      <div className={styles.rewardContainer}>
        <p className={styles.content}>You got {fragment} rascal fragment(s) </p>
        <img className={styles.fragmentImg} src="/rascal-egg-top.png" alt="" />
      </div>
    </Modal>
  );
}