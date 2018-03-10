export interface Spec_<T> {
    isSatisfiedBy(candidate: T): boolean;
    and(other: Spec_<T>): Spec_<T>;
    andNot(other: Spec_<T>): Spec_<T>;
    or(other: Spec_<T>): Spec_<T>;
    orNot(other: Spec_<T>): Spec_<T>;
    not(): Spec_<T>;
}
export declare abstract class Composite_<T> implements Spec_<T> {
    abstract isSatisfiedBy(candidate: T): boolean;
    and(other: Spec_<T>): Spec_<T>;
    andNot(other: Spec_<T>): Spec_<T>;
    or(other: Spec_<T>): Spec_<T>;
    orNot(other: Spec_<T>): Spec_<T>;
    not(): Spec_<T>;
}
export declare class And_<T> extends Composite_<T> {
    private _left;
    private _right;
    constructor(_left: Spec_<T>, _right: Spec_<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class AndNot_<T> extends Composite_<T> {
    private _left;
    private _right;
    constructor(_left: Spec_<T>, _right: Spec_<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Or_<T> extends Composite_<T> {
    private _left;
    private _right;
    constructor(_left: Spec_<T>, _right: Spec_<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class OrNot_<T> extends Composite_<T> {
    private _left;
    private _right;
    constructor(_left: Spec_<T>, _right: Spec_<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Not_<T> extends Composite_<T> {
    private _other;
    constructor(_other: Spec_<T>);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class EqualTo_<T> extends Composite_<T> {
    private _value;
    constructor(_value: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class GreaterThan_<T> extends Composite_<T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class GreaterThanOrEqualTo_<T> extends Composite_<T> {
    private _min;
    constructor(_min: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LessThan_<T> extends Composite_<T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LessThanOrEqualTo_<T> extends Composite_<T> {
    private _max;
    constructor(_max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class StartsWith_<T> extends Composite_<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class EndsWith_<T> extends Composite_<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Contains_<T> extends Composite_<T> {
    private _value;
    private _ignoreCase;
    constructor(_value: string, _ignoreCase?: boolean);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class In_<T> extends Composite_<T> {
    private _values;
    constructor(_values: T[]);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class Between_<T> extends Composite_<T> {
    private _min;
    private _max;
    constructor(_min: T, _max: T);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
export declare class LengthBetween_<T> extends Composite_<T> {
    private _min;
    private _max;
    constructor(_min: number, _max: number);
    isSatisfiedBy(candidate: T): boolean;
    toString(): string;
}
