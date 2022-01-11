export const ConvertEnum = (ob: Object, type: any) => Object.values(ob)
  .filter((value) => typeof value === type)
  .map((value) => (value));
