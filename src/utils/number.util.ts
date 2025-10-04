export const formatPrice = (money: string | number, suffix: string = '₫') => {
  const num = typeof money === 'string' ? Number(money) : money;
  if (isNaN(num)) return '0';
  return num.toLocaleString('vi-VN') + ' ' + suffix;
};
