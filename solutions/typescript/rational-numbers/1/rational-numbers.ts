export class Rational {
  private _num:number;
  private _den:number;
  constructor (num:number,den:number = 1) {
    this._num = num;
    this._den = den;
  }
  get numerator(){
    return this._den < 0 ? - this._num : this._num
  }
  get denominator(){    
    return this._num != 0 ? this._den >= 0 ? this._den : - this._den : 1
  }
  add(smd:Rational):Rational{
    return new Rational(this._num * smd._den + this._den*smd._num, this._den * smd._den).reduce(); 
  }  
  reduce():Rational{
    
    const decompose = (num:number): number[] => {
      const primes = [2,3,5,7,11,13,17];
      const isDivisible = (num:number, d:number):boolean => num % d == 0;
      let pos = 0;
      let d = primes[pos];
      const factors = [];
      while (d<=Math.abs(num)){
        while (isDivisible(num, d)){
          factors.push(d)
          num = num / d;
        }
        pos += 1;
        d = primes[pos];
      }
      return factors
    }
    const prime_f_num = decompose(this._num);
    const prime_f_den = decompose(this._den);
    
    const common:number[] = [];
    let shortest, longest;
    if (prime_f_den.length < prime_f_num.length){
      shortest = prime_f_den;
      longest = prime_f_num
    }else{
      longest = prime_f_den;
      shortest = prime_f_num
    }
    
    let startPos = 0;
    while (startPos < shortest.length){
      const commonPos = longest.findIndex(prime => prime == shortest[startPos])
      if (commonPos > -1){
        common.push(shortest[startPos]);
        longest.splice(commonPos,1);
      }
      startPos += 1;
    }

    let num = this._num,den = this._den;
    for (let prime of common){
      num /= prime;
      den /= prime;
    }    
    return new Rational(num,den);
  }
  sub(sbs:Rational):Rational{
    return new Rational(this._num * sbs._den - this._den*sbs._num, this._den * sbs._den).reduce();
  }
  mul(fct:Rational):Rational{
    return new Rational(this._num * fct._num, this._den * fct._den).reduce();
  }
  div(dvd:Rational):Rational{
    return new Rational(this._num * dvd._den, this._den * dvd._num).reduce();
  }
  abs():Rational{
    return new Rational(Math.abs(this._num),Math.abs(this._den)).reduce();
  }
  exprational(exp:number):Rational{
    if (exp < 0) {
      return new Rational(Math.pow(this._den, -exp), Math.pow(this._num, -exp)).reduce();
    } else {
      return new Rational(Math.pow(this._num, exp), Math.pow(this._den, exp)).reduce();
    }
  }
  expreal(x:number):number{
    return Math.pow(x, this._num / this._den);
  }
}