import { format, utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date: number | string, fmt: string, tz = 'UTC') =>
  format(utcToZonedTime(date, tz), fmt, { timeZone: tz });
