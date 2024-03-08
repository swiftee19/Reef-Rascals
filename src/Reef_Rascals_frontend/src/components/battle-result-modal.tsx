import { useEffect } from 'react';
import { matchmaking } from '../../../declarations/matchmaking';
import { useAuthContext } from '../middleware/middleware';
import styles from '../scss/components/battle-result-modal.module.scss';
import { getCurrentUser } from '../types/auth';
import { Rascal } from '../types/rascal';
import Modal from './modal';
import { BattleHistory } from '../types/battle-history';
import { User } from '../types/user';

export default function BattleResultModal({closeModal, battleEnd, attcker, defender, opponent, attackerId}: {closeModal: () => void, battleEnd: string | null, attcker: Rascal[], defender: Rascal[], opponent: User, attackerId: string}) {
  let fragment = 0

  if(battleEnd == "Win") {
    fragment = Math.floor(Math.random() * 3) + 1
  }

  async function getRascalFragment() {
    const userID = useAuthContext().principal
    const history = new BattleHistory(opponent, battleEnd!, attcker, defender)
    const result = await matchmaking.reward(userID, BigInt(fragment), history)
    if(result) {
      console.log("Fragment is rewarded", result)
    } else {
      console.log("Fragment is not rewarded", result)
    }
  }

  useEffect(() => {
    getRascalFragment()
  }, [])

  return (
    <Modal w='30%' h='40%' closeModal={closeModal}>
      <h1 className={styles.title}>{battleEnd === 'Win' ? 'Victory' : 'Defeat'}</h1>
      <p className={styles.content}>You've {battleEnd === 'Win' ? "won" : 'lost'} the battle!</p>
      <div className={styles.rascalsContainer}>
        {
            attcker.slice().reverse().map((rascal) => {
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