export const numberWithCommas = (x: string): string =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const bigNumber = (x: string): string[] => {
  const value = numberWithCommas(x);

  return value.split('.');
};
