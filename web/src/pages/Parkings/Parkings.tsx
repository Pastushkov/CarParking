import { useNavigate } from '@tanstack/react-location';
import { TableMeta, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import plusIcon from '../../assets/plus.svg';
import trashIcon from '../../assets/trash.svg';
import { PrimaryButton } from '../../components/Button/PrimaryButton';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';
import { TDataCell } from '../../components/Table/TDataCell';
import { THead } from '../../components/Table/THead';
import { THeadCell } from '../../components/Table/THeadCell';
import '../../generalStyles.css';
import { useParkings } from '../../queries/useParkings';
import { cn } from '../../services/cn';
import { ParkingService } from '../../services/parkingService';
import { useAdminContext } from '../../state/AdminContex';
import { Parking } from '../../types';
import { CreateParkingModal } from './CreateParkingModal/CreateParkingModal';
import { DeleteParkingModal } from './DeleteParkingModal/DeleteParkingModal';

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
    cell: ({ table, row }) => {
      const { deleteParking } = table.options.meta as TableMeta<Parking>;
      const { _id, address } = row.original;
      return (
        <div className="flex gap-2">
          <div
            className="icon h-5 w-5 cursor-pointer bg-neutral-85 hover:!bg-red-100"
            style={{
              WebkitMask: `url(${trashIcon})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
            }}
            onClick={(event) => {
              event.stopPropagation();
              deleteParking?.(_id, address);
            }}
            data-tooltip-id={`delete-project-${_id}`}
          />
          <CustomTooltip id={`delete-project-${_id}`} place="top" content={`Delete parking`} />
        </div>
      );
    },
  }),
];

export const Parkings = () => {
  const { setBoundary } = useAdminContext();

  const { data } = useParkings();
  const navigate = useNavigate();

  const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);
  const [parkingToDelete, setParkingToDelete] = useState<{
    isOpen: boolean;
    id: string | null;
    address: string | null;
  }>({ isOpen: false, id: null, address: null });
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
    meta: {
      deleteParking: (id: string, address: string) => {
        setParkingToDelete({
          isOpen: true,
          id,
          address,
        });
      },
    },
  });

  return (
    <div className="mt-4">
      <div className="flex w-full justify-between px-6">
        <div className="font-body text-3xl">Parkings</div>
        <PrimaryButton icon={plusIcon} onClick={() => setIsOpenCreateProject(true)}>
          New parking
        </PrimaryButton>
      </div>
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
              <tr
                key={row.id}
                className="row cursor-pointer border-t border-neutral-25 hover:bg-darkblue-15"
                onClick={() => {
                  navigate({ to: `/panel/parkings/${row.original._id}` });
                }}
              >
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
        <CreateParkingModal
          isOpened={isOpenCreateProject}
          onBackdropClick={() => setIsOpenCreateProject(false)}
          onSubmit={async (values: Omit<Parking, '_id'>) => {
            try {
              const data = await ParkingService.createParking(values);
              setTableData([...tableData, data]);
              setBoundary('Parking created!', 'success');
            } catch (error: any) {
              setBoundary(error?.response?.data?.message ?? 'Server error. Try again later.');
            }
          }}
        />
        <DeleteParkingModal
          isOpened={parkingToDelete.isOpen}
          address={parkingToDelete.address}
          onBackdropClick={() => setParkingToDelete({ isOpen: false, id: null, address: null })}
          onSubmit={async () => {
            if (parkingToDelete.id) {
              try {
                await ParkingService.deleteParking(parkingToDelete.id);
                setTableData((data) => data.filter(({ _id }) => _id !== parkingToDelete.id));
                setBoundary('Parking deleted!', 'success');
              } catch (error: any) {
                setBoundary(error?.response?.data?.message ?? 'Server error. Try again later.');
              }
            }
          }}
        />
      </div>
    </div>
  );
};
