const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const punctuation = [' ', ",", "."]
const encodeMap = new Map<string, string>([
  ...alphabet.map((letter, index) => [letter, alphabet[(alphabet.length - 1) - index]] as [string, string]),
  ...digits.map(d => [d, d] as [string, string]),
  ...punctuation.map(p => [p, ""] as [string, string])
]);

const decodeMap = new Map<string, string>([
  ...alphabet.reverse().map((letter, index) => [letter, alphabet[(alphabet.length - 1) - index]] as [string, string]),
  ...digits.map(d => [d, d] as [string, string])
]);
decodeMap.set(" ", "");

export function encode(plainText: string): string {
  return (plainText
    .split("")
    .map(charStr => encodeMap.get(charStr.toLowerCase()))
    .filter(charStr => charStr !== "")
    .reduce((acc = "", charStr = "", index): string => {
      return (index + 1) % 5 == 0 ? acc + charStr + " " : acc + charStr;
    }, "") || "").trimEnd();
}

export function decode(cipherText: string): string {
  return cipherText.split("").reduce((acc, charStr) => acc + decodeMap.get(charStr), "");
}