export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};
