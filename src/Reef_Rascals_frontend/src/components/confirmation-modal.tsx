import Modal from "./modal";
import styles from '../scss/components/confirmation-modal.module.scss';

interface ConfirmModalProps {
  closeModal: () => void;
  confirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ closeModal, confirm, title, message }: ConfirmModalProps) {
  return (
    <Modal closeModal={closeModal} w="30%">
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonContainer}>
        <div className={styles.cancelBtn} onClick={closeModal}>Cancel</div>
        <div className={styles.sellBtn} onClick={confirm}>Yes</div>
      </div>
    </Modal>
  )
}