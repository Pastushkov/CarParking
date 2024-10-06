import { useState } from 'react';
import errorModalIcon from '../../../assets/errorModal.svg';
import { ConfirmationContent, Modal } from '../../../components/Modal/Modal';

interface IProps {
  isOpened: boolean;
  onBackdropClick: () => void;
  address: null | string;
  onSubmit: () => Promise<any>;
}

export const DeleteParkingModal = ({ onBackdropClick, isOpened, address, onSubmit }: IProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal isOpened={isOpened} className="w-100" onBackdropClick={onBackdropClick}>
      <ConfirmationContent
        body={`Are you sure you want to delete parking on address "${address}"? This action cannot be undone.`}
        header={`Delete parking`}
        primaryBtnAction={() => {
          setLoading(true);
          onSubmit().then(() => {
            setLoading(false);
            onBackdropClick?.();
          });
        }}
        primaryBtnText="Delete"
        isPrimaryBtnDanger
        modalIcon={errorModalIcon}
        secondaryBtnText="Cancel"
        secondaryBtnAction={() => onBackdropClick?.()}
        isLoading={loading}
      />
    </Modal>
  );
};
