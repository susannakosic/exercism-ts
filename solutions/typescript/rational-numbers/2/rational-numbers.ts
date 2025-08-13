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
  
  gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  reduce():Rational{
    const divisor = this.gcd(this._num, this._den);
    return new Rational(this._num / divisor, this._den / divisor);    
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