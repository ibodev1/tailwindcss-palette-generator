export const isColor = (color: string) => {
  const reg = new RegExp(
    /^#([\da-f]{3}){1,2}$|^#([\da-f]{6}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/,
    'gim',
  );
  if (typeof color === 'string' && reg.test(color)) {
    return true;
  }

  return false;
};
