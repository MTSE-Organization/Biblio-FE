export const formatPrice = (money: string | number) => {
  const num = typeof money === 'string' ? Number(money) : money;
  if (isNaN(num)) return '0';
  return num.toLocaleString('vi-VN');
};
