import styles from "./modal.module.css";

type ModalProps = {
  children?: React.ReactChild;
  isOpen: boolean;
  closeModal: () => void;
};

export default function Modal({ children, isOpen, closeModal }: ModalProps) {
  const modalClickHandler = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={isOpen ? [styles.modal, styles.open].join(" ") : styles.open}
      onClick={modalClickHandler}
    >
      {children}
    </div>
  );
}
