export const ConvertEnum = (ob: Object) => Object.values(ob)
  .filter((value) => typeof value === 'string')
  .map((value) => (value as number));
