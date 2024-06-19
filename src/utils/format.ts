type notation = null | 'standard' | 'scientific' | 'engineering' | 'compact';

/**
 * Format a number into a string with notation.
 * @param value The number to format.
 * @param notation This is an optional field it specify notation to format.
 * @returns A formatted string representation of the number.
 */
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
/**
 * Format a number into a string with its currency symbol and optional notation.
 * @param value The number to format.
 * @param currency The currency symbol to use.
 * @param notation This is an optional field it specify notation to format.
 * @returns A formatted string representation of the number.
 */
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
