import { SortDirection } from '@tanstack/react-table';
import { cn } from '../../services/cn';
import sortArrowIcon from './assets/sort-arrow.svg';
import sortDefaultIcon from './assets/sort-default.svg';

interface SortArrowsProps {
  direction: SortDirection | false;
}

export const SortArrows = ({ direction }: SortArrowsProps) => {
  return (
    <div
      draggable={false}
      className={cn('h-4 w-4 select-none bg-black', {
        'rotate-180': direction === 'desc',
        'bg-neutral-50': !direction,
      })}
      style={{
        WebkitMask: `url(${direction ? sortArrowIcon : sortDefaultIcon})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
      }}
    />
  );
};
