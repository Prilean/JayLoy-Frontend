import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberConverter(num: number): string {
  const absNum = Math.abs(num);
  let formatted = "";
  if (absNum >= 1_000_000_000_000) {
    formatted = (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    formatted = (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    formatted = (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) { 
    formatted = (absNum / 1_000).toFixed(2) + "k";
  } else {
    formatted = absNum.toFixed(2);
  }
  return num < 0 ? `-$${formatted}` : `$${formatted}`;
}
