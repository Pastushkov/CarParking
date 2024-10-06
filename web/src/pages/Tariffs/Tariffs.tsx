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
import { useTariffs } from '../../queries/useTariffs';
import { cn } from '../../services/cn';
import { TariffService } from '../../services/tariffService';
import { useAdminContext } from '../../state/AdminContex';
import { Tariff } from '../../types';
import { CreateTariffModal } from './CreateTariffModal/CreateTariffModal';
import { DeleteTariffModal } from './DeleteTariffModal/DeleteTariffModal';
import { EditTariffModal } from './EditTariffModal/EditTariffModal';

const columnHelper = createColumnHelper<Tariff>();
const columns = [
  columnHelper.accessor('name', {
    id: 'name',
    header: () => <div>Name</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('pricePerHour', {
    id: 'pricePerHour',
    header: () => <div>Price per hour</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('startWorkingHours', {
    id: 'startWorkingHours',
    header: () => <div>Start working hours</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('endWorkingHours', {
    id: 'endWorkingHours',
    header: () => <div>End working hours</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor('freeTime', {
    id: 'freeTime',
    header: () => <div>Free time (minutes)</div>,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ table, row }) => {
      const { deleteTariff } = table.options.meta as TableMeta<Tariff>;
      const { _id, name } = row.original;
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
              deleteTariff?.(_id, name);
            }}
            data-tooltip-id={`delete-project-${_id}`}
          />
          <CustomTooltip id={`delete-project-${_id}`} place="top" content={`Delete parking`} />
        </div>
      );
    },
  }),
];

export const Tariffs = () => {
  const { data } = useTariffs();

  const { setBoundary } = useAdminContext();

  const [tariffToDelete, setTariffToDelete] = useState<{
    isOpen: boolean;
    id: string | null;
    name: string | null;
  }>({ isOpen: false, id: null, name: null });
  const [isOpenCreateTariff, setIsOpenCreateTariff] = useState(false);
  const [tableData, setTableData] = useState<Tariff[]>([]);
  const [tariffToEdit, setTariffToEdit] = useState<{
    tariff: Tariff | null;
    isOpen: boolean;
  }>({
    tariff: null,
    isOpen: false,
  });

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
      deleteTariff: (id, name) => {
        setTariffToDelete({
          isOpen: true,
          name,
          id,
        });
      },
    },
  });

  return (
    <div className="mt-4">
      <div className="flex w-full justify-between px-6">
        <div className="font-body text-3xl">Tariffs</div>
        <PrimaryButton icon={plusIcon} onClick={() => setIsOpenCreateTariff(true)}>
          New tariff
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
                  setTariffToEdit({ isOpen: true, tariff: row.original });
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
        <CreateTariffModal
          isOpened={isOpenCreateTariff}
          onBackdropClick={() => setIsOpenCreateTariff(false)}
          onSubmit={async (values) => {
            try {
              const data = await TariffService.createTariff(values);
              setTableData([...tableData, data]);
              setBoundary('Tariff created!', 'success');
            } catch (error: any) {
              setBoundary(error?.response?.data?.message ?? 'Server error. Try again later.');
            }
          }}
        />
        <DeleteTariffModal
          isOpened={tariffToDelete.isOpen}
          name={tariffToDelete.name}
          onSubmit={async () => {
            if (tariffToDelete.id) {
              try {
                await TariffService.deleteTariff(tariffToDelete.id);
                setTableData((data) => data.filter(({ _id }) => _id !== tariffToDelete.id));
                setBoundary('Tariff deleted!', 'success');
              } catch (error: any) {
                setBoundary(error?.response?.data?.message ?? 'Server error. Try again later.');
              }
            }
          }}
          onBackdropClick={() => setTariffToDelete({ isOpen: false, name: null, id: null })}
        />
        <EditTariffModal
          isOpened={tariffToEdit.isOpen}
          tariff={tariffToEdit.tariff}
          onBackdropClick={() => setTariffToEdit({ isOpen: false, tariff: null })}
          onSubmit={async (values) => {
            if (tariffToEdit.tariff) {
              try {
                await TariffService.updateTariff(tariffToEdit.tariff?._id, values);
                setBoundary('Tariff updated!', 'success');
              } catch (error) {}
            }
          }}
        />
      </div>
    </div>
  );
};
