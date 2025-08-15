const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const encodeMap = new Map<string, string>(alphabet.map((letter, index) => [letter, alphabet[(alphabet.length - 1) - index]]));
const decodeMap = new Map<string, string>(alphabet.reverse().map((letter, index) => [letter, alphabet[(alphabet.length - 1) - index]]));
function isNumber(charStr: unknown): charStr is Number {
  return !isNaN(Number(charStr))
}
function isPunctuation(charStr: string): boolean {
  return (charStr === " " || [",", "."].includes(charStr));
}

export function encode(plainText: string = ""): string {
  const encodedChars = plainText
    .split("")
    .filter(charStr => !isPunctuation(charStr))
    .map(charStr => isNumber(charStr) ? charStr : encodeMap.get(charStr.toLowerCase()))
    .reduce((acc = "", charStr, index) => {
      return (index + 1) % 5 == 0 ? acc + charStr + " " : acc + charStr;
    }, "");
  return encodedChars?.trimEnd() || "";
}

export function decode(cipherText: string): string {
  return cipherText.split("")
    .reduce((acc, charStr) => {
      return acc + (charStr !== " " ? (isNumber(charStr) ? charStr : decodeMap.get(charStr)) : "")
    }, "");
}