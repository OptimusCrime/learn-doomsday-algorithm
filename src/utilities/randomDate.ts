import { isoDateStringToDate } from './isoDateStringToDate';

const EARLIEST_DATE = isoDateStringToDate('1900-01-01');
const LATEST_DATE = new Date(); // Today

export const randomDate = (): Date => {
  const date = new Date(EARLIEST_DATE.getTime() + Math.random() * (LATEST_DATE.getTime() - EARLIEST_DATE.getTime()));

  // Timezones etc are fun...
  date.setHours(12);
  return date;
};
