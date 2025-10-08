export const formatPrice = (money: string | number, suffix: string = '₫') => {
  const num = typeof money === 'string' ? Number(money) : money;
  if (isNaN(num)) return '0';
  return num.toLocaleString('vi-VN') + ' ' + suffix;
};

export function formatNumberShort(value: number): string {
  if (value < 1000) return value.toString();

  const units = ['k', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(value) / 3);

  if (tier === 0) return value.toString();

  const suffix = units[tier - 1];
  const scaled = value / Math.pow(1000, tier);
  const rounded =
    scaled >= 10 ? Math.round(scaled) : parseFloat(scaled.toFixed(1));

  return `${rounded}${suffix}`;
}
