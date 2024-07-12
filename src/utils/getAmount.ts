/* eslint-disable prefer-named-capture-group -- groups won't be used in this scenario */
export const getAmount = (amount?: number | string, currency = "€") => {
  if (!amount) {
    return "";
  }

  const thousandsAmount = `${amount}`.replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ".",
  );
  return `${thousandsAmount} ${currency}`;
};
