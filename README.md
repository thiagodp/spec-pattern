# spec-pattern

Implementation of the [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern) for JavaScript and TypeScript.

[![npm version](https://badge.fury.io/js/spec-pattern.svg)](https://badge.fury.io/js/spec-pattern)
[![Build Status](https://travis-ci.org/thiagodp/spec-pattern.svg?branch=master)](https://travis-ci.org/thiagodp/spec-pattern) [![Greenkeeper badge](https://badges.greenkeeper.io/thiagodp/spec-pattern.svg)](https://greenkeeper.io/)

> Build complex filters and rules easily.

- No external dependencies.
- Fully [tested](https://github.com/thiagodp/spec-pattern/blob/master/__tests__/).
- It uses [semantic versioning](https://semver.org).
- *Forks are welcome!* See [how to contribute](contributing.md).

## Install

```bash
$ npm i spec-pattern
```

## Examples without syntax sugar

#### A simple Between rule
 ```js
import { Between } from 'spec-pattern';

let rules = new Between( 1, 3 );

console.log( rules.isSatisfiedBy( 2 ) ); // true
```


#### A little more complex Between rule
 ```js
import { Between } from 'spec-pattern';

let rules = new Between( 1, 3 )
    .or( new Between( 6, 9 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
```

#### Composing rules
 ```js
import { Between, In, GreaterThan } from 'spec-pattern';

let rules = new Between( 1, 3 )
    .or( new Between( 6, 9 ) )
    .or( new In( [ 11, 25, 31 ] ) )
    .or( new GreaterThan( 50 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
console.log( rules.isSatisfiedBy( 11 ) ); // true
console.log( rules.isSatisfiedBy( 50 ) ); // false
console.log( rules.isSatisfiedBy( 51 ) ); // true

// Printable !
console.log( rules.toString() );
// (((between (1, 3) or between (6, 9)) or in [11, 25, 31]) or greater than 50)
```

#### Not only numbers
```js
import { StartsWith, Contains } from 'spec-pattern';

let rules = new StartsWith( 'Hello' )
    .andNot( new Contains( 'world' ) );

console.log( rules.isSatisfiedBy( 'Hello Bob' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```

```js
import { LengthBetween, EqualTo } from 'spec-pattern';

let rules = new LengthBetween( 2, 5 )
    .andNot( new EqualTo( 'Hello' ) );

console.log( rules.isSatisfiedBy( '' ) ); // false
console.log( rules.isSatisfiedBy( 'Hi' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello' ) ); // false
console.log( rules.isSatisfiedBy( 'Howdy' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```


## Same examples with syntax sugar

#### A simple Between rule
 ```js
import { between } from 'spec-pattern';

let rules = between( 1, 3 );

console.log( rules.isSatisfiedBy( 2 ) ); // true
```

#### A little more complex Between rule
 ```js
import { between } from 'spec-pattern';

let rules = between( 1, 3 )
    .or( between( 6, 9 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
```

#### Composing rules
 ```js
import { between, isIn, greaterThan } from 'spec-pattern';

let rules = between( 1, 3 )
    .or( between( 6, 9 ) )
    .or( isIn( [ 11, 25, 31 ] ) )
    .or( greaterThan( 50 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
console.log( rules.isSatisfiedBy( 11 ) ); // true
console.log( rules.isSatisfiedBy( 50 ) ); // false
console.log( rules.isSatisfiedBy( 51 ) ); // true

// Printable !
console.log( rules.toString() );
// (((between (1, 3) or between (6, 9)) or in [11, 25, 31]) or greater than 50)
```

#### Not only numbers
```js
import { startsWith, contains } from 'spec-pattern';

let rules = startsWith( 'Hello' )
    .andNot( contains( 'world' ) );

console.log( rules.isSatisfiedBy( 'Hello Bob' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```

```js
import { lengthBetween, equalTo } from 'spec-pattern';

let rules = lengthBetween( 2, 5 )
    .andNot( equalTo( 'Hello' ) );

console.log( rules.isSatisfiedBy( '' ) ); // false
console.log( rules.isSatisfiedBy( 'Hi' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello' ) ); // false
console.log( rules.isSatisfiedBy( 'Howdy' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```


## Available sugar

- Every class has a sugar with its name in camelCase, _e.g._ `SameValueAs`' sugar is `sameValueAs`. The exception is `In`, its sugar is `isIn` (since `in` is a reserved word).


## Available classes

- `SameValueAs( value: any )`: equality of values, not of types, not of instances
- `StrictSameValueAs( value: any )`: equality of values and types, not of instances
- `EqualTo( value: any )`: equality of values or instances, with `==`
- `StrictEqualTo( value: any )`: equality of values and types or of instances, with `===`
- `SameTypeAs( value: any )`: equality of types
- `GreaterThan( value: any )`
- `GreaterThanOrEqualTo( value: any )`
- `LessThan( value: any )`
- `LessThanOrEqualTo( value: any )`
- `Between( min: any, max: any )`
- `In( values: array )`: inside an array
- `StartsWith( value: string, ignoreCase: boolean = false )`: string starts with
- `EndsWith( value: string, ignoreCase: boolean = false )`: string ends with
- `Contains( value: string, ignoreCase: boolean = false )`: string contains
- `LengthBetween( min: any, max: any )`: string length between two values
- `Empty()`: string is empty or array is empty
- `Matches( regex: RegExp )`: matches a regular expression
- `Any( ...specs: Spec )`: composite that takes in multiple `Spec`s and performs an or
- `All( ...specs: Spec )`: composite that takes in multiple `Spec`s and performs an and

All these classes extend the abstract class `Composite`, which in turn implements the interface `Spec`:

```typescript
export interface Spec< C, T extends C | unknown > {

    isSatisfiedBy( candidate: C | T ): boolean;

    and( other: Spec< C, T > ): Spec< C, T >;

    andNot( other: Spec< C, T > ): Spec< C, T >;

    or( other: Spec< C, T > ): Spec< C, T >;

    orNot( other: Spec< C, T > ): Spec< C, T >;

    not(): Spec< C, T >;

}
```

## Creating your own class

Create your own class by extending the *abstract* class `Composite`, like in the following example. Of course, you can also extend one of the aforementioned classes or implement the interface `Spec` *(but why reinventing the wheel, right?)*.

Let's create a class `DifferentFrom` ...

*...in TypeScript:*
```typescript
import { Composite } from 'spec-pattern';

export class DifferentFrom< C, T extends C | unknown > extends Composite< C, T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: C | T ): boolean {
        return this._value != candidate;
    }

    toString(): string {
        return 'different from ' + this._value;
    }

}
```

*...or in JavaScript 6+:*
```js
import { Composite } from 'spec-pattern';

class DifferentFrom extends Composite {

    constructor( value ) {
        this.value = value;
    }

    isSatisfiedBy( candidate ) {
        return this.value != candidate;
    }

    toString() {
        return 'different from ' + this.value;
    }
}
```


*...or in JavaScript 5+:*
```js
var Composite  = require( 'spec-pattern' ).Composite;

function DifferentFrom( value ) {

    Composite.call( this ); // super()

    this.value = value;

    this.isSatisfiedBy = function ( candidate ) {
        return this.value != candidate;
    };

    this.toString = function() {
        return 'different from ' + this.value;
    };
}

DifferentFrom.prototype = Object.create( Composite.prototype );
DifferentFrom.prototype.constructor = DifferentFrom;
```

*That's it!* Just three methods: `constructor`, `isSatisfiedBy`, and `toString()`.

## License

[MIT](LICENSE) © [Thiago Delgado Pinto](https://github.com/thiagodp)
