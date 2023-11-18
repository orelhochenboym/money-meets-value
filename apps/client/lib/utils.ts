import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decimalFormatter = new Intl.NumberFormat(undefined, {
  style: 'decimal',
  signDisplay: 'exceptZero',
  maximumFractionDigits: 2,
});
export const fractionFormatter = new Intl.NumberFormat(undefined, {
  style: 'decimal',
  maximumFractionDigits: 2,
});
export const compactFormatter = new Intl.NumberFormat(undefined, {
  style: 'decimal',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2,
});
export const percentFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  signDisplay: 'exceptZero',
  maximumFractionDigits: 2,
});
