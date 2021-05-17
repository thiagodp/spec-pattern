
export interface Spec< C, T extends C | unknown > {

    isSatisfiedBy( candidate: C | T ): boolean;

    and( other: Spec< C, T > ): Spec< C, T >;

    andNot( other: Spec< C, T > ): Spec< C, T >;

    or( other: Spec< C, T > ): Spec< C, T >;

    orNot( other: Spec< C, T > ): Spec< C, T >;

    not(): Spec< C, T >;

}


export abstract class Composite< C, T > implements Spec< C, T > {

    abstract isSatisfiedBy( candidate: C | T ): boolean;

    and( other: Spec< C, T > ): Spec< C, T > {
        return new And< C, T >( this, other );
    }

    andNot( other: Spec< C, T > ): Spec< C, T > {
        return new AndNot< C, T >( this, other );
    }

    or( other: Spec< C, T > ): Spec< C, T > {
        return new Or< C, T >( this, other );
    }

    orNot( other: Spec< C, T > ): Spec< C, T > {
        return new OrNot< C, T >( this, other );
    }

    not(): Spec< C, T > {
        return new Not< C, T >( this );
    }

}

// ---------------------------------------------------------------------------

export class And< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _left: Spec< C, T >, private _right: Spec< C, T > ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and ' + this._right.toString() + ')';
    }

}

// Syntax sugar
export function and< C, T extends C | unknown >( left: Spec< C, T >, right: Spec< C, T > ) {
    return new And< C, T >( left, right );
}

// ---------------------------------------------------------------------------

export class AndNot< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _left: Spec< C, T >, private _right: Spec< C, T > ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._left.isSatisfiedBy( candidate ) && ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' and not ' + this._right.toString() + ')';
    }

}

// Syntax sugar
export function andNot< C, T extends C | unknown >( left: Spec< C, T >, right: Spec< C, T > ) {
    return new AndNot< C, T >( left, right );
}

// ---------------------------------------------------------------------------

export class Or< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _left: Spec< C, T >, private _right: Spec< C, T > ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or ' + this._right.toString() + ')';
    }

}

// Syntax sugar
export function or< C, T extends C | unknown >( left: Spec< C, T >, right: Spec< C, T > ) {
    return new Or< C, T >( left, right );
}

// ---------------------------------------------------------------------------

export class OrNot< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _left: Spec< C, T >, private _right: Spec< C, T > ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._left.isSatisfiedBy( candidate ) || ! this._right.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(' + this._left.toString() + ' or not ' + this._right.toString() + ')';
    }

}

// Syntax sugar
export function orNot< C, T extends C | unknown >( left: Spec< C, T >, right: Spec< C, T > ) {
    return new OrNot< C, T >( left, right );
}

// ---------------------------------------------------------------------------

export class Not< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _other: Spec< C, T > ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return ! this._other.isSatisfiedBy( candidate );
    }

    toString(): string {
        return '(not ' + this._other.toString() + ')';
    }

}

// Syntax sugar
export function not< C, T extends C | unknown >( other: Spec< C, T > ) {
    return new Not< C, T >( other );
}

// ---------------------------------------------------------------------------

export class EqualTo< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._value == candidate;
    }

    toString(): string {
        return 'equal to ' + this._value;
    }

}

// Syntax sugar
export function equalTo< C, T extends C | unknown >( value: T ) {
    return new EqualTo< C, T >( value );
}

// ---------------------------------------------------------------------------

export class StrictEqualTo< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._value === candidate;
    }

    toString(): string {
        return 'strict equal to ' + this._value;
    }

}

// Syntax sugar
export function strictEqualTo< C, T extends C | unknown >( value: T ) {
    return new StrictEqualTo< C, T >( value );
}

// ---------------------------------------------------------------------------

export class SameValueAs< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {

        const hasSimpleType = ( x: unknown ): boolean =>
            [ 'string', 'number', 'bigint', 'boolean', 'undefined' ].indexOf( typeof x ) >= 0;

        if ( hasSimpleType( candidate ) && hasSimpleType( this._value ) ) {
            return candidate == this._value;
        }

        return JSON.stringify( candidate ) == JSON.stringify( this._value );
    }

    toString(): string {
        return 'has same value as ' + this._value;
    }

}

// Syntax sugar
export function sameValueAs< C, T extends C | unknown >( value: T ) {
    return new SameValueAs< C, T >( value );
}

// ---------------------------------------------------------------------------

export class SameTypeAs< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {

        const notAnObject = ( x: unknown ): boolean => typeof x != 'object';

        if ( notAnObject( candidate ) && notAnObject( this._value ) ) {
            return typeof candidate == typeof this._value;
        }

        return candidate.constructor.name == this._value.constructor.name;
    }

    toString(): string {
        return 'has same type as ' + this._value;
    }

}

// Syntax sugar
export function sameTypeAs< C, T extends C | unknown >( value: T ) {
    return new SameTypeAs< C, T >( value );
}

// ---------------------------------------------------------------------------

export class GreaterThan< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _min: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return candidate > this._min;
    }

    toString(): string {
        return 'greater than ' + this._min;
    }

}

// Syntax sugar
export function greaterThan< C, T extends C | unknown >( min: T ) {
    return new GreaterThan< C, T >( min );
}

// ---------------------------------------------------------------------------

export class GreaterThanOrEqualTo< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _min: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return candidate >= this._min;
    }

    toString(): string {
        return 'greater than or equal to ' + this._min;
    }

}

// Syntax sugar
export function greaterThanOrEqualTo< C, T extends C | unknown >( min: T ) {
    return new GreaterThanOrEqualTo< C, T >( min );
}

// ---------------------------------------------------------------------------

export class LessThan< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return candidate < this._max;
    }

    toString(): string {
        return 'less than ' + this._max;
    }

}

// Syntax sugar
export function lessThan< C, T extends C | unknown >( max: T ) {
    return new LessThan< C, T >( max );
}

// ---------------------------------------------------------------------------

export class LessThanOrEqualTo< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return candidate <= this._max;
    }

    toString(): string {
        return 'less than or equal to ' + this._max;
    }

}

// Syntax sugar
export function lessThanOrEqualTo< C, T extends C | unknown >( max: T ) {
    return new LessThanOrEqualTo< C, T >( max );
}

// ---------------------------------------------------------------------------

export class StartsWith< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return 0 === c.indexOf( v );
    }

    toString(): string {
        return 'starts with ' + this._value;
    }

}

// Syntax sugar
export function startsWith< C, T extends C | unknown >( value: string, ignoreCase: boolean = false ) {
    return new StartsWith< C, T >( value, ignoreCase );
}

// ---------------------------------------------------------------------------

export class EndsWith< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.substr( c.length - v.length, v.length ) === v;
    }

    toString(): string {
        return 'ends with ' + this._value;
    }

}

// Syntax sugar
export function endsWith< C, T extends C | unknown >( value: string, ignoreCase: boolean = false ) {
    return new EndsWith< C, T >( value, ignoreCase );
}

// ---------------------------------------------------------------------------

export class Contains< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: string, private _ignoreCase: boolean = false ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        const c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        const v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.indexOf( v ) !== -1;
    }

    toString(): string {
        return 'contains ' + this._value;
    }

}

// Syntax sugar
export function contains< C, T extends C | unknown >( value: string, ignoreCase: boolean = false ) {
    return new Contains< C, T >( value, ignoreCase );
}

// ---------------------------------------------------------------------------

export class In< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _values: T[] ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._values.indexOf( candidate as T ) >= 0;
    }

    toString(): string {
        return 'in [' + this._values.join( ', ' ) + ']';
    }

}

// Syntax sugar
export function isIn< C, T extends C | unknown >( values: T[] ) {
    return new In< C, T >( values );
}

// ---------------------------------------------------------------------------

export class Between< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _min: T, private _max: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return candidate >= this._min && candidate <= this._max;
    }

    toString(): string {
        return 'between (' + this._min + ', ' + this._max + ')';
    }

}

// Syntax sugar
export function between< C, T extends C | unknown >(  min: T, max: T ) {
    return new Between< C, T >( min, max );
}

// ---------------------------------------------------------------------------

export class LengthBetween< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _min: number, private _max: number ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        const len = candidate.toString().length;
        return len >= this._min && len <= this._max;
    }

    toString(): string {
        return 'length between (' + this._min + ', ' + this._max + ')';
    }

}

// Syntax sugar
export function lengthBetween< C, T extends C | unknown >(  min: number, max: number ) {
    return new LengthBetween< C, T >( min, max );
}

// ---------------------------------------------------------------------------

export class Empty< C, T extends C | unknown > extends Composite< C, T > {

    constructor() {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return Array.isArray( candidate )
            ? 0 === candidate.length
            : '' === candidate;
    }

    toString(): string {
        return 'is empty';
    }

}

// Syntax sugar
export function empty< C, T extends C | unknown >() {
    return new Empty< C, T >();
}

// ---------------------------------------------------------------------------

export class Matches< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _regex: RegExp ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._regex.test( candidate.toString() );
    }

    toString(): string {
        return 'regex ' + this._regex.source;
    }

}

// Syntax sugar
export function matches< C, T extends C | unknown >( regex: RegExp ) {
    return new Matches< C, T >( regex );
}

// ---------------------------------------------------------------------------

export class Any< C, T extends C | unknown > extends Composite< C, T > {

	private readonly specs: Spec< C, T >[];

	constructor( ...specs: Spec< C, T >[] ) {
		super();
		this.specs = specs;
	}

	isSatisfiedBy( candidate: C | T ): boolean {
		for ( const currentSpec of this.specs ) {
			if ( currentSpec.isSatisfiedBy( candidate ) ) {
                return true;
            }
		}
		return 0 == this.specs.length;
	}

	toString(): string {
		return '(' + this.specs.join( ' or ' ) + ')';
	}
}

// Syntax sugar
export function any< C, T extends C | unknown >( ...specs: Spec< C, T >[] ) {
    return new Any< C, T >( ...specs );
}

// ---------------------------------------------------------------------------

export class All< C, T extends C | unknown > extends Composite< C, T > {

	private readonly specs: Spec< C, T >[];

	constructor( ...specs: Spec< C, T >[] ) {
		super();
		this.specs = specs;
	}

	isSatisfiedBy( candidate: C | T ): boolean {
		for ( const currentSpec of this.specs ) {
			if ( ! currentSpec.isSatisfiedBy( candidate ) ) {
                return false;
            }
		}
		return true;
	}

	toString(): string {
		return '(' + this.specs.join( ', ' ) + ')';
	}
}

// Syntax sugar
export function all< C, T extends C | unknown >( ...specs: Spec< C, T >[] ) {
    return new All< C, T >( ...specs );
}
