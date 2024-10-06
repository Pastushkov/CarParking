import { ReactNode, UIEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../services/cn';
import { PrimaryModalButton } from '../Button/Modal/PrimaryModalButton';
import { SecondaryModalButton } from '../Button/Modal/SecondaryModalButton';

interface ModalProps {
  isOpened: boolean;
  onBackdropClick?: (event: UIEvent<HTMLDivElement>) => void;
  className?: string;
  children: ReactNode;
}

interface ConfirmationProps {
  header: string;
  body: string;
  secondaryBtnText?: string;
  secondaryBtnAction?: () => void;
  primaryBtnText: string;
  primaryBtnAction: () => void;
  isPrimaryBtnDanger?: boolean;
  modalIcon?: string;
  isLoading?: boolean;
}

export function Modal({ isOpened, onBackdropClick, className, children }: ModalProps) {
  if (!isOpened) return null;
  return (
    isOpened &&
    createPortal(
      <div
        className="absolute left-0 top-0 right-0 bottom-0 z-50 bg-darkblue-120/60 font-body text-base text-neutral-100 antialiased backdrop-blur-sm"
        onClick={onBackdropClick}
        onKeyDown={(event) => {
          if (event.code === 'Escape') onBackdropClick?.(event);
        }}
      >
        <div
          className={cn(
            'absolute left-0 top-0 right-0 bottom-0 m-auto h-fit overflow-hidden rounded-xl bg-white p-6',
            className,
          )}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>,
      document.body,
    )
  );
}

export function ConfirmationContent({
  header,
  body,
  secondaryBtnText,
  secondaryBtnAction,
  primaryBtnText,
  primaryBtnAction,
  isPrimaryBtnDanger = false,
  modalIcon,
  isLoading,
}: ConfirmationProps) {
  return (
    <>
      <div>
        {modalIcon && <img className="mb-5" draggable={false} src={modalIcon} width={56} height={56} alt="i" />}
        <div className="mb-2 text-lg font-semibold text-neutral-100">{header}</div>
        <div className="mb-8 text-sm text-neutral-85">{body}</div>
      </div>
      <div className="flex h-11 w-full gap-3">
        {secondaryBtnText && secondaryBtnAction && (
          <SecondaryModalButton autoFocus disabled={isLoading} onClick={secondaryBtnAction}>
            {secondaryBtnText}
          </SecondaryModalButton>
        )}
        <PrimaryModalButton
          loading={isLoading}
          disabled={isLoading}
          danger={isPrimaryBtnDanger}
          onClick={primaryBtnAction}
        >
          {primaryBtnText}
        </PrimaryModalButton>
      </div>
    </>
  );
}
