export interface Spec<T> {
    isSatisfiedBy(candidate: T): boolean;
    and(other: Spec<T>): Spec<T>;
    andNot(other: Spec<T>): Spec<T>;
    or(other: Spec<T>): Spec<T>;
    orNot(other: Spec<T>): Spec<T>;
    not(): Spec<T>;
}
export declare abstract class Composite<T> implements Spec<T> {
    abstract isSatisfiedBy(candidate: T): boolean;
    and(other: Spec<T>): Spec<T>;
    andNot(other: Spec<T>): Spec<T>;
    or(other: Spec<T>): Spec<T>;
    orNot(other: Spec<T>): Spec<T>;
    not(): Spec<T>;
}
export declare class And<T> extends Composite<T> {
    private _left;
    private _right;
    constructor(_left: Spec<T>, _right: Spec<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class AndNot<T> extends Composite<T> {
    private _left;
    private _right;
    constructor(_left: Spec<T>, _right: Spec<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Or<T> extends Composite<T> {
    private _left;
    private _right;
    constructor(_left: Spec<T>, _right: Spec<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class OrNot<T> extends Composite<T> {
    private _left;
    private _right;
    constructor(_left: Spec<T>, _right: Spec<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Not<T> extends Composite<T> {
    private _other;
    constructor(_other: Spec<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class EqualTo<T> extends Composite<T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class GreaterThan<T> extends Composite<T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class GreaterThanOrEqualTo<T> extends Composite<T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LessThan<T> extends Composite<T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LessThanOrEqualTo<T> extends Composite<T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class StartsWith<T> extends Composite<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class EndsWith<T> extends Composite<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Contains<T> extends Composite<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class In<T> extends Composite<T> {
    private _values;
    constructor(_values: T[]);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Between<T> extends Composite<T> {
    private _min;
    private _max;
    constructor(_min: T, _max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LengthBetween<T> extends Composite<T> {
    private _min;
    private _max;
    constructor(_min: number, _max: number);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Matches<T> extends Composite<T> {
    private _regex;
    constructor(_regex: RegExp);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
