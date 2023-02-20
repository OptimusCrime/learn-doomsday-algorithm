export const formatDate = (dateTime: Date): string => {
  const [date] = dateTime.toISOString().split('T');
  const [year, month, day] = date.split('-');

  return `${year}-${month}-${day}`;
};
