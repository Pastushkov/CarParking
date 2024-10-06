import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import tariffIcon from '../../../assets/tariff.svg';
import { PrimaryButton } from '../../../components/Button/PrimaryButton';
import { SecondaryButton } from '../../../components/Button/SecondaryButton';
import { Input } from '../../../components/Input/Input';
import { Modal } from '../../../components/Modal/Modal';
import { tariffSchema } from '../../../schemas/schemas';
import { cn } from '../../../services/cn';
import { Tariff } from '../../../types';

interface Props {
  isOpened: boolean;
  onBackdropClick: () => void;
  onSubmit: (values: any) => Promise<any>;
  tariff: Tariff | null;
}

export const EditTariffModal = ({ isOpened, onBackdropClick, onSubmit, tariff }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onSubmit',
    values: {
      name: tariff?.name ?? '',
      pricePerHour: tariff?.pricePerHour ?? 0,
      endWorkingHours: tariff?.endWorkingHours ?? '',
      startWorkingHours: tariff?.startWorkingHours ?? '',
      freeTime: tariff?.freeTime ?? '',
    },
    resolver: yupResolver(tariffSchema),
  });

  const submit = (values: any) => {
    setIsLoading(true);
    onSubmit(values).then(() => {
      onBackdropClick();
      reset();
    });
    setIsLoading(false);
  };

  return (
    <Modal isOpened={isOpened} onBackdropClick={onBackdropClick} className="w-100 overflow-visible p-6">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex items-center gap-8">
          <div className="text-lg font-semibold">Edit tariff</div>
          <img src={tariffIcon} className="h-12 w-12" alt="parking" />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <div>
            <label className="font-semibold">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} />}
            />
            <div className="h-5">
              {errors.name && <label className=" mt-1 text-sm text-error-500">{errors?.name?.message}</label>}
            </div>
          </div>
          <div>
            <label className="font-semibold">Price per hour</label>
            <Controller
              name="pricePerHour"
              control={control}
              render={({ field }) => <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} />}
            />
            <div className="h-5">
              {errors.pricePerHour && (
                <label className=" mt-1 text-sm text-error-500">{errors?.pricePerHour?.message}</label>
              )}
            </div>
          </div>

          <div>
            <label className="font-semibold">Start working hours</label>
            <Controller
              name="startWorkingHours"
              control={control}
              render={({ field }) => (
                <Input type="time" {...field} tabIndex={0} className="w-full" value={field.value ?? null} />
              )}
            />
            <div className="h-5">
              {errors.startWorkingHours && (
                <label className=" mt-1 text-sm text-error-500">{errors?.startWorkingHours?.message}</label>
              )}
            </div>
          </div>
          <div>
            <label className="font-semibold">End working hours</label>
            <Controller
              name="endWorkingHours"
              control={control}
              render={({ field }) => (
                <Input type="time" {...field} tabIndex={0} className="w-full" value={field.value ?? null} />
              )}
            />
            <div className="h-5">
              {errors.endWorkingHours && (
                <label className=" mt-1 text-sm text-error-500">{errors?.endWorkingHours?.message}</label>
              )}
            </div>
          </div>
          <div>
            <label className="font-semibold">Free time (minutes)</label>
            <Controller
              name="freeTime"
              control={control}
              render={({ field }) => <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} />}
            />
            <div className="h-5">
              {errors.freeTime && <label className=" mt-1 text-sm text-error-500">{errors?.freeTime?.message}</label>}
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full gap-2">
          <SecondaryButton
            className="h-10 w-full items-center justify-center"
            onClick={() => {
              onBackdropClick?.();
              reset();
            }}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            disabled={isLoading}
            loading={isLoading}
            className={cn(
              'h-10 w-full items-center justify-center disabled:border-lightblue-40 disabled:bg-lightblue-40 disabled:text-white',
            )}
          >
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};
