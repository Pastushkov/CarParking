import { flexRender, Header } from '@tanstack/react-table';
import clsx from 'clsx';
import React from 'react';
import { cn } from '../../services/cn';
import { SortArrows } from './SortArrows';

interface Props
  extends React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement> {
  header: Header<any, unknown>;
  pinnedScrolling?: boolean;
  align?: 'right' | 'left' | 'center';
  // useNewApproachForActiveCell is temporarily implemented, will be removed after all tables will implement new approach
  useNewApproachForActiveCell?: boolean;
  useMinWidth?: boolean;
}

export const THeadCell = ({
  header,
  className,
  pinnedScrolling = false,
  align = 'left',
  useNewApproachForActiveCell,
  useMinWidth,
  ...rest
}: Props) => {
  const useWidth = (header.column.columnDef.meta as any)?.useWidth;

  return (
    <th
      style={
        useNewApproachForActiveCell
          ? {
              width: useWidth ? header.column.getSize() : undefined,
              minWidth: useMinWidth ? header.column.getSize() : undefined,
              maxWidth: useMinWidth ? header.column.getSize() : undefined,
            }
          : undefined
      }
      {...rest}
      className={clsx(className, `select-none bg-white px-2 py-2 text-left text-xs font-semibold`, {
        'cursor-pointer': header.column.getCanSort(),
        // 'w-40 truncate': !header.column.getIsPinned(),
        'sticky right-0 after:absolute after:bottom-0 after:left-0 after:top-0 after:w-5 after:-translate-x-full after:transition-shadow':
          header.column.getIsPinned(),
        'after:shadow-[inset_-10px_0_8px_-8px_#00000026]': header.column.getIsPinned() && pinnedScrolling,
      })}
      onClick={header.column.getToggleSortingHandler()}
    >
      <div className={cn('flex gap-1', { 'justify-end': align === 'right' }, { 'justify-center': align === 'center' })}>
        {flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() && <SortArrows direction={header.column.getIsSorted()} />}
      </div>
    </th>
  );
};
