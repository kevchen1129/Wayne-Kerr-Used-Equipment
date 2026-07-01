export function formatDisplayPrice(price: string): string {
  const normalizedPrice = price.replace(/,/g, "").trim();

  if (!/^\d+(\.\d+)?$/.test(normalizedPrice)) {
    return price;
  }

  const [integerPart, decimalPart] = normalizedPrice.split(".");
  const formattedInteger = new Intl.NumberFormat("en-US").format(Number(integerPart));

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
