export interface Spec_< T > {

    isSatisfiedBy( candidate: T ): boolean;

    and( other: Spec_< T > ): Spec_< T >;

    andNot( other: Spec_< T > ): Spec_< T >;

    or( other: Spec_< T > ): Spec_< T >;

    orNot( other: Spec_< T > ): Spec_< T >;

    not(): Spec_< T >;

}


export abstract class Composite_< T > implements Spec_< T > {

    abstract isSatisfiedBy( candidate: T ): boolean

    and( other: Spec_< T > ): Spec_< T > {
        return new And_< T >( this, other );
    }

    andNot( other: Spec_< T > ): Spec_< T > {
        return new AndNot_< T >( this, other );
    }

    or( other: Spec_< T > ): Spec_< T > {
        return new Or_< T >( this, other );
    }

    orNot( other: Spec_< T > ): Spec_< T > {
        return new OrNot_< T >( this, other );
    }

    not(): Spec_< T > {
        return new Not_< T >( this );
    }

}


export class And_< T > extends Composite_< T > {

    constructor( private _left: Spec_< T >, private _right: Spec_< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and ' + this._right.toString() + ')';
    }

}


export class AndNot_< T > extends Composite_< T > {

    constructor( private _left: Spec_< T >, private _right: Spec_< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and not ' + this._right.toString() + ')';
    }

}


export class Or_< T > extends Composite_< T > {

    constructor( private _left: Spec_< T >, private _right: Spec_< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or ' + this._right.toString() + ')';
    }

}


export class OrNot_< T > extends Composite_< T > {

    constructor( private _left: Spec_< T >, private _right: Spec_< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or not ' + this._right.toString() + ')';
    }

}


export class Not_< T > extends Composite_< T > {

    constructor( private _other: Spec_< T > ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return ! this._other.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(not ' + this._other.toString() + ')';
    }

}


export class EqualTo_< T > extends Composite_< T > {

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


export class GreaterThan_< T > extends Composite_< T > {

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


export class GreaterThanOrEqualTo_< T > extends Composite_< T > {

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


export class LessThan_< T > extends Composite_< T > {

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


export class LessThanOrEqualTo_< T > extends Composite_< T > {

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


export class StartsWith_< T > extends Composite_< T > {

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


export class EndsWith_< T > extends Composite_< T > {

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


export class Contains_< T > extends Composite_< T > {

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


export class In_< T > extends Composite_< T > {

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


export class Between_< T > extends Composite_< T > {

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


export class LengthBetween_< T > extends Composite_< T > {

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