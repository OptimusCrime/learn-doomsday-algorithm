export const isoDateStringToDate = (isoString: string): Date => {
  const [year, month, date] = isoString.split('-').map((value) => parseInt(value));

  return new Date(year, month - 1, date);
};
