import { DEFAULT_DATE_FORMAT } from '@/constants';
import { logger } from '@/logger';
import { format as formatFn, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDate = (
  date: string | null | undefined,
  outputFormat: string = DEFAULT_DATE_FORMAT
) => {
  if (!date) return '';
  try {
    const parsedDate = new Date(date);
    if (!isValid(parsedDate)) return '';
    return formatFn(parsedDate, outputFormat, { locale: vi });
  } catch (error) {
    logger.error('Invalid date', date, error);
    return '';
  }
};
