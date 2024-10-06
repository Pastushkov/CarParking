import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PrimaryButton } from '../../components/Button/PrimaryButton';
import { Input } from '../../components/Input/Input';
import { loginSchema } from '../../schemas/schemas';
import { AuthenticationState, authenticate } from '../../services/authService';
import { cn } from '../../services/cn';
import splashImage from './assets/splash.png';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      phone: '',
      password: '',
    },
    values: {
      phone: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const submit = async (values: { phone: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await authenticate(values);
      switch (res) {
        case AuthenticationState.Authenticated:
          navigate({
            to: '/panel/parkings',
          });
          break;
        case AuthenticationState.Unauthorized:
          setError('Invalid credentials');
          break;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-24">
      <div className="flex justify-center text-4xl font-semibold">Welcome to admin panel</div>
      <div className="flex w-full items-center justify-center">
        <div className=" w-2/3 text-center">
          <div className="m-5 flex justify-center text-3xl font-bold">Sing in</div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="font-semibold">Phone number</label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    autoFocus
                    tabIndex={0}
                    placeholder="380123456789"
                    className={cn({
                      'border-red-40 focus:border-red-40': errors.phone || error,
                    })}
                  />
                )}
              />
              <div className="h-5">
                {errors.phone && <label className=" mt-1 text-sm text-error-500">{errors?.phone?.message}</label>}
              </div>
            </div>
            <div>
              <label className="font-semibold">Password</label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    className={cn({
                      'border-red-40 focus:border-red-40': errors.password || error,
                    })}
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    autoFocus
                    tabIndex={0}
                  />
                )}
              />
              <div className="h-5">
                {errors.password && <label className=" mt-1 text-sm text-error-500">{errors?.password?.message}</label>}
              </div>
            </div>
          </div>
          <div className="m-5 flex flex-col items-center justify-center gap-2">
            {error && <div className=" mt-1 text-sm text-error-500">{error}</div>}
            <PrimaryButton
              loading={isLoading}
              disabled={isLoading}
              className="w-25 text-center"
              onClick={handleSubmit(submit)}
            >
              Login
            </PrimaryButton>
          </div>
        </div>
        <div className="w-1/3">
          <img alt="image" src={splashImage} />
        </div>
      </div>
    </div>
  );
};
