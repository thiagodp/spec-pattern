export interface Spec< T > {

    isSatisfiedBy( candidate: T ): boolean;

    and( other: Spec< T > ): Spec< T >;

    andNot( other: Spec< T > ): Spec< T >;

    or( other: Spec< T > ): Spec< T >;

    orNot( other: Spec< T > ): Spec< T >;

    not(): Spec< T >;

}


export abstract class Composite< T > implements Spec< T > {

    abstract isSatisfiedBy( candidate: T ): boolean

    and( other: Spec< T > ): Spec< T > {
        return new And< T >( this, other );
    }

    andNot( other: Spec< T > ): Spec< T > {
        return new AndNot< T >( this, other );
    }

    or( other: Spec< T > ): Spec< T > {
        return new Or< T >( this, other );
    }

    orNot( other: Spec< T > ): Spec< T > {
        return new OrNot< T >( this, other );
    }

    not(): Spec< T > {
        return new Not< T >( this );
    }

}


export class And< T > extends Composite< T > {

    constructor( private _left: Spec< T >, private _right: Spec< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and ' + this._right.toString() + ')';
    }

}


export class AndNot< T > extends Composite< T > {

    constructor( private _left: Spec< T >, private _right: Spec< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and not ' + this._right.toString() + ')';
    }

}


export class Or< T > extends Composite< T > {

    constructor( private _left: Spec< T >, private _right: Spec< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or ' + this._right.toString() + ')';
    }

}


export class OrNot< T > extends Composite< T > {

    constructor( private _left: Spec< T >, private _right: Spec< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or not ' + this._right.toString() + ')';
    }

}


export class Not< T > extends Composite< T > {

    constructor( private _other: Spec< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return ! this._other.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(not ' + this._other.toString() + ')';
    }

}


export class EqualTo< T > extends Composite< T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._value == candidate;
    }

    toString(): string {
        return 'equal to ' + this._value;
    }

}


export class GreaterThan< T > extends Composite< T > {

    constructor( private _min: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return candidate > this._min;
    }

    toString(): string {
        return 'greater than ' + this._min;
    }

}


export class GreaterThanOrEqualTo< T > extends Composite< T > {

    constructor( private _min: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return candidate >= this._min;
    }

    toString(): string {
        return 'greater than or equal to ' + this._min;
    }

}


export class LessThan< T > extends Composite< T > {

    constructor( private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return candidate < this._max;
    }

    toString(): string {
        return 'less than ' + this._max;
    }

}


export class LessThanOrEqualTo< T > extends Composite< T > {

    constructor( private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return candidate <= this._max;
    }

    toString(): string {
        return 'less than or equal to ' + this._max;
    }

}


export class StartsWith< T > extends Composite< T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return 0 === c.indexOf( v );
    }

    toString(): string {
        return 'starts with ' + this._value;
    }

}


export class EndsWith< T > extends Composite< T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.substr( c.length - v.length, v.length ) === v;
    }

    toString(): string {
        return 'ends with ' + this._value;
    }

}


export class Contains< T > extends Composite< T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.indexOf( v ) !== -1;
    }

    toString(): string {
        return 'contains ' + this._value;
    }

}


export class In< T > extends Composite< T > {

    constructor( private _values: T[] ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._values.indexOf( candidate ) >= 0;
    }

    toString(): string {
        return 'in [' + this._values.join( ', ' ) + ']';
    }

}


export class Between< T > extends Composite< T > {

    constructor( private _min: T, private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return candidate >= this._min && candidate <= this._max;
    }

    toString(): string {
        return 'between (' + this._min + ', ' + this._max + ')';
    }

}


export class LengthBetween< T > extends Composite< T > {

    constructor( private _min: number, private _max: number ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        const len = candidate.toString().length;
        return len >= this._min && len <= this._max;
    }

    toString(): string {
        return 'length between (' + this._min + ', ' + this._max + ')';
    }

}


export class Matches< T > extends Composite< T > {

    constructor( private _regex: RegExp ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._regex.test( candidate.toString() );
    }

    toString(): string {
        return 'regex ' + this._regex.source;
    }

}