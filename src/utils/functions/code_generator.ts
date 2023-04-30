/** @format */

export const generateCode = (): string => {
  const number = Math.floor(Math.random() * 10000);

  // pad the number with leading zeros if necessary
  const code = number.toString().padStart(4, "0");

  // return the code as a string
  return code;
};
