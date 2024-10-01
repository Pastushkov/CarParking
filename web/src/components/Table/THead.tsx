import { ReactNode } from 'react';
import { cn } from '../../services/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export function THead({ children, className }: Props) {
  return <thead className={cn('top-0 z-10', className)}>{children}</thead>;
}
