export const filterDataByRange = (range: string, data: any): any[] => {
  switch (range) {
    case '1y':
    case 'All':
      return data.monthlyData;
    case '6m':
      return data.last6Months;
    case '3m':
      return data.last3Months;
    case '1m':
      return data.last30days;
    case '7d':
      return data.last7days;
    default:
      return data.monthlyData;
  }
};

export const yTickFormatter = (value: number): string => {
  if (value === 0) {
    return '0';
  }

  if (value >= 1000) {
    return `${value % 1000}M`;
  }

  return `${value}K`;
};
