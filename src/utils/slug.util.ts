export const getIdFromSlug = (slug: string) => {
  if (!slug) return '';
  const id = slug.split('.')[1];
  return id;
};
