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

export class Any< C, T extends C | unknown > extends Composite< C, T > {

	private readonly specs: Spec< C, T >[];

	constructor( ...specs: Spec< C, T >[]) {
		super();
		this.specs = specs;
	}

	isSatisfiedBy( candidate: C | T ): boolean {
		for (const currentSpec of this.specs) {
			if (currentSpec.isSatisfiedBy(candidate)) return true;
		}
		return this.specs.length == 0;
	}

	toString(): string {
		return '(' + this.specs.join(' or ') + ')';
	}
}

export class All< C, T extends C | unknown > extends Composite< C, T > {

	private readonly specs: Spec< C, T >[];

	constructor( ...specs: Spec< C, T >[]) {
		super();
		this.specs = specs;
	}

	isSatisfiedBy( candidate: C | T ): boolean {
		for (const currentSpec of this.specs) {
			if (!currentSpec.isSatisfiedBy(candidate)) return false;
		}
		return true;
	}

	toString(): string {
		return '(' + this.specs.join(' and ') + ')';
	}
}
