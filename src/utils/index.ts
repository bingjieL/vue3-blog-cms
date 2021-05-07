import dayjs from 'dayjs';


export const dateFormat = (date: Date, symbol: string = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(symbol);
};
