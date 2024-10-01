import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { TDataCell } from '../../components/Table/TDataCell';
import { THead } from '../../components/Table/THead';
import { THeadCell } from '../../components/Table/THeadCell';
import '../../generalStyles.css';
import { useParkings } from '../../queries/useParkings';
import { cn } from '../../services/cn';
import { Parking } from '../../types';

const columnHelper = createColumnHelper<Parking>();
const columns = [
  columnHelper.accessor('address', {
    id: 'address',
    header: () => <div>Address</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('size', {
    id: 'size',
    header: () => <div>Total places</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('occupied', {
    id: 'occupied',
    header: () => <div>Occupied places</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'freePlaces',
    header: () => <div>Free places</div>,
    cell: ({ row }) => {
      const value = row.original.size - row.original.occupied;
      return <div>{value}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('floorCount', {
    id: 'floorCount',
    header: () => <div>Floor count</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('tariffId.name', {
    id: 'tariffName',
    header: () => <div>Tariff name</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: () => {
      return (
        <div className="flex gap-2">
          <div>Edit</div>
          <div>Delete</div>
        </div>
      );
    },
  }),
];

export const Parkings = () => {
  const { data } = useParkings();

  const [tableData, setTableData] = useState<Parking[]>([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="m-6 rounded-lg border border-darkblue-15 bg-white py-1 shadow-md">
      <table className="w-full">
        <THead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="rounded-b-lg">
              {headerGroup.headers.map((column, index) => (
                <THeadCell
                  key={index}
                  header={column}
                  className={cn(`justify-between`, {
                    'first:rounded-bl-lg last:rounded-br-lg': getRowModel().rows.length === 0,
                  })}
                />
              ))}
            </tr>
          ))}
        </THead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id} className="row cursor-pointer border-t border-neutral-25 hover:bg-darkblue-15">
              {row.getAllCells().map((cell) => (
                <TDataCell
                  key={cell.id}
                  cell={cell}
                  className={cn(`h-14 bg-white pl-2 pr-2`, {
                    'first:rounded-bl-lg last:rounded-br-lg': cell.row.index === row.getAllCells().length - 1,
                  })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
