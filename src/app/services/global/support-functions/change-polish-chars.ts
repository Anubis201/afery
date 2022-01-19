export const ChangePolishChars = (str: string) => {
  str = str.replace('ę','e');
  str = str.replace('ó','o');
  str = str.replace('ą','a');
  str = str.replace('ś','s');
  str = str.replace('ł','l');
  str = str.replace('ż','z');
  str = str.replace('ź','z');
  str = str.replace('ć','c');
  str = str.replace('ń','n');

  return str.replace(/\s/g, '-').toLowerCase();
}
