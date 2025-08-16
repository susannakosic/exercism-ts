const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const getEncodings = (alphabet: Array<string>): Array<[string, string]> => alphabet.map((letter, index) => [letter, alphabet[(alphabet.length - 1) - index]]);
const encodeMap = new Map<string, string>(getEncodings(alphabet));
const decodeMap = new Map<string, string>(getEncodings([...alphabet.reverse()]));

export function encode(plainText: string = ""): string {
  const encodedChars = plainText
    .replace(/\W+/g, "")
    .replace(/[a-z]/gi, match => encodeMap.get(match.toLowerCase()) || "")
    .split("")
    .reduce((acc, charStr, index) => {
      return (index + 1) % 5 == 0 ? acc + charStr + " " : acc + charStr;
    }, "");
  return encodedChars.trimEnd();
}

export function decode(cipherText: string = ""): string {
  return cipherText
    .replace(/\W+/g, "")
    .replace(/[a-z]/gi, match => decodeMap.get(match.toLowerCase()) || "")
}