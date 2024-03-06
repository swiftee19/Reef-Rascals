import styles from '../scss/components/battle-result-modal.module.scss';
import Modal from './modal';

export default function BattleResultModal({closeModal, battleEnd}: {closeModal: () => void, battleEnd: string | null}){
  return (
    <Modal w='40%' h='40%' closeModal={closeModal}>
      <h1>{battleEnd === 'Win' ? 'Victory' : 'Defeat'}</h1>
      <p>You've {battleEnd === 'Win' ? "won" : 'lost'} the battle!</p>
    </Modal>
  );
}