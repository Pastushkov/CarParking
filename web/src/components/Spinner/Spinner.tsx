import { cn } from '../../services/cn';
import loadingSpinner from './assets/loading-spinner.svg';

interface Props {
  className?: string;
}

export function Spinner({ className = '' }: Props) {
  return (
    <img className={cn('h-18 w-18 animate-spin', className)} draggable={false} alt="Loading..." src={loadingSpinner} />
  );
}
