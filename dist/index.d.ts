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
export declare class AndNot<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Or<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class OrNot<C, T extends C | unknown> extends Composite<C, T> {
    private _left;
    private _right;
    constructor(_left: Spec<C, T>, _right: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Not<C, T extends C | unknown> extends Composite<C, T> {
    private _other;
    constructor(_other: Spec<C, T>);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class EqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class StrictEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class SameValueAs<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class SameTypeAs<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class GreaterThan<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class GreaterThanOrEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class LessThan<C, T extends C | unknown> extends Composite<C, T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class LessThanOrEqualTo<C, T extends C | unknown> extends Composite<C, T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class StartsWith<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class EndsWith<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Contains<C, T extends C | unknown> extends Composite<C, T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class In<C, T extends C | unknown> extends Composite<C, T> {
    private _values;
    constructor(_values: T[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Between<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    private _max;
    constructor(_min: T, _max: T);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class LengthBetween<C, T extends C | unknown> extends Composite<C, T> {
    private _min;
    private _max;
    constructor(_min: number, _max: number);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Matches<C, T extends C | unknown> extends Composite<C, T> {
    private _regex;
    constructor(_regex: RegExp);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class Any<C, T extends C | unknown> extends Composite<C, T> {
    private readonly specs;
    constructor(...specs: Spec<C, T>[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
export declare class All<C, T extends C | unknown> extends Composite<C, T> {
    private readonly specs;
    constructor(...specs: Spec<C, T>[]);
    isSatisfiedBy(candidate: C | T): boolean;
    toString(): string;
}
