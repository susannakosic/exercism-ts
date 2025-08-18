
export class SimpleCipher {
  private _alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private _keyLength: number = 100;
  private _key: string;

  *randomCharsGenerator(length:number = 0) {  
    let i = 0;  
    while (i < length) {
      yield this._alphabet[Math.floor(Math.random() * this._alphabet.length)];
      i++;
    }
  }

  constructor(key?: string) {
    if (key) this._key = key
    else this._key = [...this.randomCharsGenerator(this._keyLength)].join("");
  }

  encode(plaintext: string): string {
    let result = ''
    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i]
      const keyChar = this.key[i % this.key.length]
      const encodedChar = String.fromCharCode(
        ((plainChar.charCodeAt(0) - 97 + keyChar.charCodeAt(0) - 97) % this._alphabet.length) + "a".charCodeAt(0)
      )
      result += encodedChar
    }
    return result
  }

  decode(ciphertext: string): string {
    let result = ''
    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i]
      const keyChar = this.key[i % this.key.length]
      const decodedChar = String.fromCharCode(
        ((cipherChar.charCodeAt(0) - keyChar.charCodeAt(0) + this._alphabet.length) % this._alphabet.length) + "a".charCodeAt(0)
      )
      result += decodedChar
    }
    return result
  }
  

  get key () {
    return this._key
  }
}