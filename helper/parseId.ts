export const parseId = (param: string): number | null => {
  const id = parseInt(param);
  return isNaN(id) ? null : id;
};