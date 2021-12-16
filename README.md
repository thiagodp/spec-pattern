[![npm (tag)](https://img.shields.io/npm/v/spec-pattern?color=green&label=NPM&style=for-the-badge)](https://github.com/thiagodp/spec-pattern/releases)
[![License](https://img.shields.io/npm/l/spec-pattern.svg?style=for-the-badge&color=green)](https://github.com/thiagodp/spec-pattern/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/dt/spec-pattern?style=for-the-badge&color=green)](https://www.npmjs.com/package/spec-pattern)

# spec-pattern

Implementation of the [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern) for JavaScript and TypeScript.

> Build complex filters and rules easily.

- No external dependencies.
- Fully [tested](https://github.com/thiagodp/spec-pattern/blob/master/__tests__/).
- [Semantic versioning](https://semver.org).
- *Forks are welcome!* See [how to contribute](contributing.md).

## Installation

```bash
$ npm i spec-pattern
```

## Usage

### Without syntax sugar

#### A simple Between rule
 ```js
import { Between } from 'spec-pattern';

const rating = new Between( 1, 5 );

console.log( rating.isSatisfiedBy( 3 ) ); // true
console.log( rating.isSatisfiedBy( 0 ) ); // false
```


#### A little more complex Between rule
 ```js
import { Between } from 'spec-pattern';

const desiredAgesToAnswerSurvey = new Between( 16, 21 )
	.or( new Between( 65, 120 ) );

console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 18 ) ); // true
console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 70 ) ); // true
console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 5 ) ); // false
```

#### Composing rules
 ```js
import { Between, In, GreaterThan } from 'spec-pattern';

const someCrazyRule = new Between( 1, 3 )
    .or( new Between( 6, 9 ) )
    .or( new In( [ 11, 25, 31 ] ) )
    .or( new GreaterThan( 50 ) );

console.log( someCrazyRule.isSatisfiedBy( 2 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 7 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 5 ) ); // false
console.log( someCrazyRule.isSatisfiedBy( 11 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 50 ) ); // false
console.log( someCrazyRule.isSatisfiedBy( 51 ) ); // true

// Printable !
console.log( someCrazyRule.toString() );
// (((between (1, 3) or between (6, 9)) or in [11, 25, 31]) or greater than 50)
```

#### Not only numbers
```js
import { StartsWith, Contains } from 'spec-pattern';

const helloWithoutWorld = new StartsWith( 'Hello' )
    .andNot( new Contains( 'world' ) );

console.log( helloWithoutWorld.isSatisfiedBy( 'Hello Bob' ) ); // true
console.log( helloWithoutWorld.isSatisfiedBy( 'Hello world' ) ); // false
```

```js
import { LengthBetween, EqualTo } from 'spec-pattern';

const crazyText = new LengthBetween( 2, 5 )
    .andNot( new EqualTo( 'Hello' ) );

console.log( crazyText.isSatisfiedBy( '' ) ); // false
console.log( crazyText.isSatisfiedBy( 'Hi' ) ); // true
console.log( crazyText.isSatisfiedBy( 'Hello' ) ); // false
console.log( crazyText.isSatisfiedBy( 'Howdy' ) ); // true
console.log( crazyText.isSatisfiedBy( 'Hello world' ) ); // false
```


### With syntax sugar

#### A simple Between rule
 ```js
import { between } from 'spec-pattern';

const rating = between( 1, 5 );

console.log( rating.isSatisfiedBy( 3 ) ); // true
console.log( rating.isSatisfiedBy( 0 ) ); // false
```

#### A little more complex Between rule
 ```js
import { between } from 'spec-pattern';

const desiredAgesToAnswerSurvey = between( 16, 21 )
	.or( between( 65, 120 ) );

console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 18 ) ); // true
console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 70 ) ); // true
console.log( desiredAgesToAnswerSurvey.isSatisfiedBy( 5 ) ); // false
```

#### Composing rules
 ```js
import { between, isIn, greaterThan } from 'spec-pattern';

const someCrazyRule = between( 1, 3 )
    .or( between( 6, 9 ) )
    .or( isIn( [ 11, 25, 31 ] ) )
    .or( greaterThan( 50 ) );

console.log( someCrazyRule.isSatisfiedBy( 2 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 7 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 5 ) ); // false
console.log( someCrazyRule.isSatisfiedBy( 11 ) ); // true
console.log( someCrazyRule.isSatisfiedBy( 50 ) ); // false
console.log( someCrazyRule.isSatisfiedBy( 51 ) ); // true

// Printable !
console.log( someCrazyRule.toString() );
// (((between (1, 3) or between (6, 9)) or in [11, 25, 31]) or greater than 50)
```

#### Not only numbers
```js
import { startsWith, contains } from 'spec-pattern';

const helloWithoutWorld = startsWith( 'Hello' )
    .andNot( contains( 'world' ) );

console.log( helloWithoutWorld.isSatisfiedBy( 'Hello Bob' ) ); // true
console.log( helloWithoutWorld.isSatisfiedBy( 'Hello world' ) ); // false
```

```js
import { lengthBetween, equalTo } from 'spec-pattern';

const crazyText = lengthBetween( 2, 5 )
    .andNot( equalTo( 'Hello' ) );

console.log( crazyText.isSatisfiedBy( '' ) ); // false
console.log( crazyText.isSatisfiedBy( 'Hi' ) ); // true
console.log( crazyText.isSatisfiedBy( 'Hello' ) ); // false
console.log( crazyText.isSatisfiedBy( 'Howdy' ) ); // true
console.log( crazyText.isSatisfiedBy( 'Hello world' ) ); // false
```


## Available sugar

There is a corresponding sugar function for every available class. Sugar functions are always named in _camelCase_.
For instance, `sameValueAs()` for the class `SameValueAs`.
The only exception is the class `In`. Since `in` is a reserved word in JavaScript and thus cannot be a function name, the corresponding sugar is `isIn`.


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

    xor( other: Spec< C, T > ): Spec< C, T >;

    xorNot( other: Spec< C, T > ): Spec< C, T >;

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
