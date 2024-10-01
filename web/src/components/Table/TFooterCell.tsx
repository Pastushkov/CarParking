import { flexRender, Header } from '@tanstack/react-table';
import React from 'react';
import { cn } from '../../services/cn';

interface Props
  extends React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> {
  header: Header<any, unknown>;
}

export const TFooterCell = ({ className, header, ...rest }: Props) => (
  <td className={cn(className)} {...rest}>
    {flexRender(header.column.columnDef.footer, header.getContext())}
  </td>
);
