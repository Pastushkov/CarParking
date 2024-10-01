import { Cell, flexRender } from '@tanstack/react-table';
import React from 'react';
import { cn } from '../../services/cn';

interface Props
  extends React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> {
  cell: Cell<any, unknown>;
  pinnedScrolling?: boolean;
  isSelected?: boolean;
  // useNewApproachForActiveCell is temporarily implemented, will be removed after all tables will implement new approach
  useNewApproachForActiveCell?: boolean;
  isFocused?: boolean;
}

export const TDataCell = ({
  className,
  cell,
  pinnedScrolling = false,
  isSelected = false,
  colSpan,
  id,
  onKeyDown,
  useNewApproachForActiveCell,
  isFocused,
  ...restProps
}: Props) => {
  return (
    <td
      {...restProps}
      onKeyDown={onKeyDown}
      id={id}
      colSpan={colSpan}
      className={cn(className, {
        truncate: !cell.column.getIsPinned(),
        'sticky right-0 after:absolute after:bottom-0 after:left-0 after:top-0 after:w-5 after:-translate-x-full after:transition-shadow':
          cell.column.getIsPinned(),
        'after:shadow-[inset_-10px_0_8px_-8px_#00000026]': cell.column.getIsPinned() && pinnedScrolling,
        'bg-white': isSelected,
      })}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
