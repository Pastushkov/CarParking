import crossIcon from '../../assets/cross.svg';
import errorModalIcon from '../../assets/errorModal.svg';
import successModalIcon from '../../assets/successModal.svg';

interface Props {
  message?: string;
  close: () => void;
  type?: 'error' | 'success';
}

export const Boundary = ({ close, message, type = 'error' }: Props) => {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] h-fit w-100 bg-white p-6 shadow-xl">
      <div className="flex items-start justify-around gap-4 text-sm">
        <img src={type === 'error' ? errorModalIcon : successModalIcon} alt="" />
        <div>{message || 'Server Error! The changes have not been saved. Please try again later.'}</div>
        <img src={crossIcon} className="cursor-pointer" alt="" onClick={() => close()} />
      </div>
    </div>
  );
};
