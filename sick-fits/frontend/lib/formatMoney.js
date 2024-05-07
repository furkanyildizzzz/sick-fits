const formatMoney = (amount) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigitsDigits: 2,
  };

  if (amount % 100 === 0) options.minimumFractionDigitsDigits = 0;
  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
};
export default formatMoney;
