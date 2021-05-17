export interface Spec<C, T extends C | unknown> {
    isSatisfiedBy(candidate: C | T): boolean;
    and(other: Spec<C, T>): Spec<C, T>;
    andNot(other: Spec<C, T>): Spec<C, T>;
    or(other: Spec<C, T>): Spec<C, T>;
    orNot(other: Spec<C, T>): Spec<C, T>;
    not(): Spec<C, T>;
}
export declare abstract class Composite<C, T> implements Spec<C, T> {
    abstract isSatisfiedBy(candidate: C | T): boolean;
    and(other: Spec<C, T>): Spec<C, T>;
    andNot(other: Spec<C, T>): Spec<C, T>;
    or(other: Spec<C, T>): Spec<C, T>;
    orNot(other: Spec<C, T>): Spec<C, T>;
    not(): Spec<C, T>;
}
export declare class And<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function and<C, T extends C | unknown>(left: Spec<C, T>, right: Spec<C, T>): And<C, T>;
export declare class AndNot<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function andNot<C, T extends C | unknown>(left: Spec<C, T>, right: Spec<C, T>): AndNot<C, T>;
export declare class Or<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function or<C, T extends C | unknown>(left: Spec<C, T>, right: Spec<C, T>): Or<C, T>;
export declare class OrNot<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function orNot<C, T extends C | unknown>(left: Spec<C, T>, right: Spec<C, T>): OrNot<C, T>;
export declare class Not<C, T extends C | unknown> extends Composite<C, T> {
    private _other;
    constructor(_other: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function not<C, T extends C | unknown>(other: Spec<C, T>): Not<C, T>;
export declare class EqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function equalTo<C, T extends C | unknown>(value: T): EqualTo<C, T>;
export declare class StrictEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function strictEqualTo<C, T extends C | unknown>(value: T): StrictEqualTo<C, T>;
export declare class SameValueAs<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function sameValueAs<C, T extends C | unknown>(value: T): SameValueAs<C, T>;
export declare class SameTypeAs<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function sameTypeAs<C, T extends C | unknown>(value: T): SameTypeAs<C, T>;
export declare class GreaterThan<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function greaterThan<C, T extends C | unknown>(min: T): GreaterThan<C, T>;
export declare class GreaterThanOrEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function greaterThanOrEqualTo<C, T extends C | unknown>(min: T): GreaterThanOrEqualTo<C, T>;
export declare class LessThan<C, T extends C | unknown> extends Composite<C, T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function lessThan<C, T extends C | unknown>(max: T): LessThan<C, T>;
export declare class LessThanOrEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function lessThanOrEqualTo<C, T extends C | unknown>(max: T): LessThanOrEqualTo<C, T>;
export declare class StartsWith<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function startsWith<C, T extends C | unknown>(value: string, ignoreCase?: boolean): StartsWith<C, T>;
export declare class EndsWith<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function endsWith<C, T extends C | unknown>(value: string, ignoreCase?: boolean): EndsWith<C, T>;
export declare class Contains<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function contains<C, T extends C | unknown>(value: string, ignoreCase?: boolean): Contains<C, T>;
export declare class In<C, T extends C | unknown> extends Composite<C, T> {
    private _values;
    constructor(_values: T[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function isIn<C, T extends C | unknown>(values: T[]): In<C, T>;
export declare class Between<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    private _max;
    constructor(_min: T, _max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function between<C, T extends C | unknown>(min: T, max: T): Between<C, T>;
export declare class LengthBetween<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    private _max;
    constructor(_min: number, _max: number);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function lengthBetween<C, T extends C | unknown>(min: number, max: number): LengthBetween<C, T>;
export declare class Empty<C, T extends C | unknown> extends Composite<C, T> {
    constructor();
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function empty<C, T extends C | unknown>(): Empty<C, T>;
export declare class Matches<C, T extends C | unknown> extends Composite<C, T> {
    private _regex;
    constructor(_regex: RegExp);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function matches<C, T extends C | unknown>(regex: RegExp): Matches<C, T>;
export declare class Any<C, T extends C | unknown> extends Composite<C, T> {
    private readonly specs;
    constructor(...specs: Spec<C, T>[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function any<C, T extends C | unknown>(...specs: Spec<C, T>[]): Any<C, T>;
export declare class All<C, T extends C | unknown> extends Composite<C, T> {
    private readonly specs;
    constructor(...specs: Spec<C, T>[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare function all<C, T extends C | unknown>(...specs: Spec<C, T>[]): All<C, T>;
