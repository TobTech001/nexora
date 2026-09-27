// utils/formatCurrency.ts

export const formatCurrency = (amount: number): string => {
  return `\u20a6${amount.toLocaleString('en-NG')}`;
};