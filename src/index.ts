import { config } from './config.js';

// Базові функції з суворою типізацією
export function add(a: number, b: number): number {
  return a + b;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Складний тип і форматер
export type NumberFormatOptions = {
  precision?: number;
  locale?: string;
};

export function formatNumber(value: number, options?: NumberFormatOptions): string {
  const precision = options?.precision ?? config.APP_PRECISION;
  return value.toFixed(precision);
}

// Клас Logger з літеральним типом
export type LogLevel = 'silent' | 'info' | 'debug';

export class Logger {
  constructor(private level: LogLevel) {}

  info(msg: string): void {
    if (this.level !== 'silent') {
      console.log('[INFO]', msg);
    }
  }

  debug(msg: string): void {
    if (this.level === 'debug') {
      console.log('[DEBUG]', msg);
    }
  }
}

// Інтерфейс та Generic-функція
export interface User {
  id: number;
  name: string;
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const group = String(item[key]);
      acc[group] = acc[group] ?? [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
