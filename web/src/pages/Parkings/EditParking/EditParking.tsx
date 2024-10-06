import { useNavigate } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import leftArrowIcon from '../../../assets/arrow-left.svg';
import { PrimaryButton } from '../../../components/Button/PrimaryButton';
import { SecondaryButton } from '../../../components/Button/SecondaryButton';
import { Input } from '../../../components/Input/Input';
import { Map } from '../../../components/Map/Map';
import { Select } from '../../../components/Select/Select';
import { Spinner } from '../../../components/Spinner/Spinner';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { useTariffs } from '../../../queries/useTariffs';
import { ParkingService } from '../../../services/parkingService';
import { useAdminContext } from '../../../state/AdminContex';
import { Option, Parking } from '../../../types';

export const EditParking = () => {
  const { setBoundary } = useAdminContext();
  const { data: tariffs } = useTariffs();
  const { id } = useRouteParams();
  const navigate = useNavigate();

  const [possition, setPossition] = useState<{ lat: number; lng: number } | null>(null);
  const [parking, setParking] = useState<Parking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchParking = async (id: string) => {
    try {
      const data = await ParkingService.fetchParkingById(id);
      setParking(data);
      setPossition(data.possition);
    } catch (error) {
      console.log(error);
      navigate({ to: '/panel/parkings' });
    }
  };

  useEffect(() => {
    fetchParking(id);
  }, [id]);

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
    values: {
      address: parking?.address ?? '',
      size: parking?.size ?? '',
      floorCount: parking?.floorCount ?? '',
      tariffId: parking?.tariffId ?? '',
    },
  });

  const submit = async (values: any) => {
    setIsLoading(true);
    try {
      await ParkingService.updateParking(id, { ...values, possition });
      setBoundary('Parking updated!', 'success');
    } catch (error: any) {
      setBoundary(error?.response?.data?.message ?? 'Server error. Try again later.');
    }
    setIsLoading(false);
  };

  if (!parking) {
    return (
      <div className="flex h-[80vh] w-screen items-center justify-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <div
          className="icon h-6 w-6 cursor-pointer bg-neutral-100 hover:bg-darkblue-70"
          style={{
            WebkitMask: `url(${leftArrowIcon})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
          }}
          onClick={() => {
            navigate({ to: '/panel/parkings' });
          }}
        />
        <div className="w-full text-3xl font-bold">Edit parking</div>
      </div>
      <div className="flex w-full gap-5">
        <form onSubmit={handleSubmit(submit)} className="flex w-1/3 flex-col">
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <label className="font-semibold">Address</label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    tabIndex={0}
                    className="w-full"
                    value={field.value ?? undefined}
                    onChange={(e) => {
                      field.onChange(e);
                      setPossition(null);
                    }}
                    disabled
                  />
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
                render={({ field }) => (
                  <Input {...field} tabIndex={0} className="w-full" value={field.value ?? undefined} />
                )}
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
                render={({ field }) => (
                  <Input {...field} tabIndex={0} className="w-full" value={field.value ?? undefined} />
                )}
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
                    className={'mt-1 w-full'}
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
          <div className="flex flex-1 flex-grow" />
          <div className="mt-8 flex w-full gap-2">
            <SecondaryButton
              className="h-10 w-full items-center justify-center"
              onClick={() => {
                reset();
                navigate({ to: '/panel/parkings' });
              }}
              type="reset"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              disabled={isLoading}
              loading={isLoading}
              className={
                'h-10 w-full items-center justify-center disabled:border-lightblue-40 disabled:bg-lightblue-40 disabled:text-white'
              }
            >
              Save
            </PrimaryButton>
          </div>
        </form>
        <div className="w-2/3">
          <Map
            className="h-[80vh]"
            setAddress={(address) => {
              setValue('address', address);
            }}
            possition={possition}
            setPossition={setPossition}
          />
        </div>
      </div>
    </div>
  );
};
