import { useState } from 'react';
import errorModalIcon from '../../../assets/errorModal.svg';
import { ConfirmationContent, Modal } from '../../../components/Modal/Modal';

interface IProps {
  isOpened: boolean;
  onBackdropClick: () => void;
  name: null | string;
  onSubmit: () => Promise<any>;
}

export const DeleteTariffModal = ({ onBackdropClick, isOpened, name, onSubmit }: IProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal isOpened={isOpened} className="w-100" onBackdropClick={onBackdropClick}>
      <ConfirmationContent
        body={`Are you sure you want to delete tariff with name "${name}" ? This action cannot be undone.`}
        header={`Delete tariff`}
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
