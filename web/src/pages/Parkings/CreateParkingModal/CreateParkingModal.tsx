import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import parkingIcon from '../../../assets/parking.svg';
import { PrimaryButton } from '../../../components/Button/PrimaryButton';
import { SecondaryButton } from '../../../components/Button/SecondaryButton';
import { Input } from '../../../components/Input/Input';
import { Map } from '../../../components/Map/Map';
import { Modal } from '../../../components/Modal/Modal';
import { Select } from '../../../components/Select/Select';
import { useTariffs } from '../../../queries/useTariffs';
import { createParkingSchema } from '../../../schemas/schemas';
import { cn } from '../../../services/cn';
import { Option } from '../../../types';

interface Props {
  isOpened: boolean;
  onBackdropClick: () => void;
  onSubmit: (values: any) => Promise<any>;
}

export const CreateParkingModal = ({ isOpened, onBackdropClick, onSubmit }: Props) => {
  const { data: tariffs } = useTariffs();

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tariffSelectOptions: Option[] = tariffs?.map(({ name, _id }) => ({
    label: name,
    value: _id,
  }));

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      size: undefined,
      tariffId: undefined,
      floorCount: undefined,
      address: undefined,
    },
    resolver: yupResolver(createParkingSchema),
  });

  const submit = (values: any) => {
    setIsLoading(true);
    onSubmit({ ...values, position: {
      coordinates: [position?.lat,position?.lng]
    } }).then(() => {
      onBackdropClick();
      reset();
    });
    setIsLoading(false);
  };

  return (
    <Modal isOpened={isOpened} onBackdropClick={onBackdropClick} className="w-200 overflow-visible p-6">
      <div className="flex gap-4">
        <form onSubmit={handleSubmit(submit)} className="w-1/3 ">
          <div className="flex items-center gap-8">
            <div className="text-lg font-semibold">Create new parking</div>
            <img src={parkingIcon} className="h-12 w-12" alt="parking" />
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <label className="font-semibold">Address</label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} disabled />
                )}
              />
              <div className="h-5">
                {errors.address && <label className=" mt-1 text-sm text-error-500">{errors?.address?.message}</label>}
              </div>
            </div>
            <div>
              <label className="font-semibold">Size</label>
              <Controller
                name="size"
                control={control}
                render={({ field }) => <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} />}
              />
              <div className="h-5">
                {errors.size && <label className=" mt-1 text-sm text-error-500">{errors?.size?.message}</label>}
              </div>
            </div>

            <div>
              <label className="font-semibold">Floor count</label>
              <Controller
                name="floorCount"
                control={control}
                render={({ field }) => <Input {...field} tabIndex={0} className="w-full" value={field.value ?? null} />}
              />
              <div className="h-5">
                {errors.floorCount && (
                  <label className=" mt-1 text-sm text-error-500">{errors?.floorCount?.message}</label>
                )}
              </div>
            </div>
            <div>
              <label className="font-semibold">Tariff</label>
              <Controller
                name="tariffId"
                control={control}
                render={({ field }) => (
                  <Select
                    className={cn('mt-1 w-full')}
                    {...field}
                    id="tariffId"
                    value={tariffSelectOptions.find((option) => option.value === field.value)}
                    placeholder="Start typing"
                    options={tariffSelectOptions}
                    onChange={(e) => {
                      field.onChange(e?.value);
                    }}
                    isSearchable
                    isError={!!errors.tariffId}
                  />
                )}
              />
              <div className="h-5">
                {errors.tariffId && <label className=" mt-1 text-sm text-error-500">{errors?.tariffId?.message}</label>}
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
              Create
            </PrimaryButton>
          </div>
        </form>
        <div className="w-2/3">
          <Map
            className="h-[72vh]"
            position={position}
            setPosition={setPosition}
            setAddress={(address) => setValue('address', address)}
          />
        </div>
      </div>
    </Modal>
  );
};
