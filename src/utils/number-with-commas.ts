export const numberWithCommas = (x: string): string =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
