export const formatAbbreviatedNumber = (num, decimalPlaces = 1) => {
  if (num === null || num === undefined) {
    return "0";
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const units = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];

  // Find the largest unit that the number is greater than or equal to
  const unit = units
    .slice()
    .reverse()
    .find((u) => absNum >= u.value);

  if (unit) {
    // Calculate the value in terms of the chosen unit
    const formattedValue = (absNum / unit.value).toFixed(decimalPlaces);

    // Remove trailing .0 if present for whole numbers (e.g., 5.0K -> 5K)
    const cleanedValue = formattedValue.endsWith(".0")
      ? formattedValue.slice(0, -2)
      : formattedValue;

    return `${sign}${cleanedValue}${unit.symbol}`;
  }

  // Fallback for numbers smaller than 1000 (no abbreviation)
  return `${sign}${absNum.toLocaleString()}`;
};

export const formatCurrency = (num) => {
  if (num === null || num === undefined) {
    return "₹0";
  }
  return `₹${num.toLocaleString("en-IN")}`;
};
