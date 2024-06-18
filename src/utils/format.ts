type notation = null | 'standard' | 'scientific' | 'engineering' | 'compact';
const formatNumber = (
  value: number,
  { notation }: { notation?: notation }
): string => {
  const options: Intl.NumberFormatOptions = {};
  if (notation) {
    options.notation = notation;
  }
  return new Intl.NumberFormat('en-US', options).format(
    isNaN(value) ? 0 : value
  );
};
const formatAmount = (
  value: number,
  { notation, currency }: { notation?: notation; currency: string }
) => {
  let options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  };
  if (notation) {
    options.notation = notation;
  }
  return new Intl.NumberFormat('en-US', options).format(value);
};
export { formatNumber, formatAmount };
