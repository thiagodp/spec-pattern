# spec-pattern
Implementation of the [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern) for JavaScript and TypeScript.

> Build complex filters and rules easily.

No external dependencies. Fully [tested](__tests__/index.spec.ts). Adopts [semantic versioning](https://semver.org). *Forks are welcome!*

[![Build Status](https://travis-ci.org/thiagodp/spec-pattern.svg?branch=master)](https://travis-ci.org/thiagodp/spec-pattern)

## Install

```console
$ npm install spec-pattern --save
```

## Examples

#### A simple Between rule
 ```js
import { Between_ } from 'spec-pattern';

let rules = new Between_( 1, 3 );

console.log( rules.isSatisfiedBy( 2 ) ); // true
```


#### A little more complex Between rule
 ```js
import { Between_ } from 'spec-pattern';

let rules = new Between_( 1, 3 )
    .or( new Between_( 6, 9 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
```

#### Composing rules
 ```js
import { Between_, In_, GreaterThan_ } from 'spec-pattern';

let rules = new Between_( 1, 3 )
    .or( new Between_( 6, 9 ) )
    .or( new In_( [ 11, 25, 31 ] )
    .or( new GreaterThan_( 50 ) );

console.log( rules.isSatisfiedBy( 2 ) ); // true
console.log( rules.isSatisfiedBy( 7 ) ); // true
console.log( rules.isSatisfiedBy( 5 ) ); // false
console.log( rules.isSatisfiedBy( 11 ) ); // true
console.log( rules.isSatisfiedBy( 50 ) ); // false
console.log( rules.isSatisfiedBy( 51 ) ); // true
```

#### Not only numbers
```js
import { StartsWith_, Contains_ } from 'spec-pattern';

let rules = new StartsWith_( 'Hello' )
    .andNot( new Contains_( 'world' ) );

console.log( rules.isSatisfiedBy( 'Hello Bob' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```
```js
import { LengthBetween_, EqualTo_ } from 'spec-pattern';

let rules = new LengthBetween_( 2, 5 )
    .andNot( new EqualTo_( 'Hello' ) );

console.log( rules.isSatisfiedBy( '' ) ); // false
console.log( rules.isSatisfiedBy( 'Hi' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello' ) ); // false
console.log( rules.isSatisfiedBy( 'Howdy' ) ); // true
console.log( rules.isSatisfiedBy( 'Hello world' ) ); // false
```

## Available classes

- `EqualTo_( value: any )`
- `GreaterThan_( value: any )`
- `GreaterThanOrEqualTo_( value: any )`
- `LessThan_( value: any )`
- `LessThanOrEqualTo_( value: any )`
- `Between_( min: any, max: any )`
- `In_( values: array )`
- `StartsWith_( value: string, ignoreCase: boolean = false )`
- `EndsWith_( value: string, ignoreCase: boolean = false )`
- `Contains_( value: string, ignoreCase: boolean = false )`
- `LengthBetween_( min: any, max: any )`
- `Matches_( regex: RegExp )`

All these classes extend the abstract class `Composite_`, which in turn implements the interface `Spec_`:

```typescript
interface Spec_< T > {

    isSatisfiedBy( candidate: T ): boolean;

    and( other: Spec_< T > ): Spec_< T >;

    andNot( other: Spec_< T > ): Spec_< T >;

    or( other: Spec_< T > ): Spec_< T >;

    orNot( other: Spec_< T > ): Spec_< T >;

    not(): Spec_< T >;
}
```

## Creating your own class

Creating your own class is **very easy**. Just extends *abstract* class `Composite_`, like in the following example. Of course, you can also extend one of the aforementioned classes or implement the interface `Spec_` *(but why reinventing the wheel, right?)*.

Let's create a class `DifferentFrom_` ...

*...in TypeScript:*
```typescript
import { Composite_ } from 'spec-pattern';

export class DifferentFrom_< T > extends Composite_< T > {

    constructor( private _value: T ) {
        super();
    }

    isSatisfiedBy( candidate: T ): boolean {
        return this._value != candidate;
    }

    toString(): string {
        return 'different from ' + this._value;
    }
}
```

*...or in JavaScript 6+:*
```js
import { Composite_ } from 'spec-pattern';

class DifferentFrom_ extends Composite_ {

    constructor( value ) {
        this._value = value;
    }

    isSatisfiedBy( candidate ) {
        return this._value != candidate;
    }

    toString() {
        return 'different from ' + this._value;
    }
}
```


*...or in JavaScript 5+:*
```js
var Composite_  = require( 'spec-pattern' ).Composite_;

function DifferentFrom_( value ) {

    Composite_.call( this ); // super()

    this._value = value;

    this.isSatisfiedBy = function ( candidate ) {
        return this._value != candidate;
    };

    this.toString = function() {
        return 'different from ' + this._value;
    };
}

DifferentFrom_.prototype = Object.create( Composite_.prototype );
DifferentFrom_.prototype.constructor = DifferentFrom_;
```

*That's it!* Just three methods: `constructor`, `isSatisfiedBy`, and `toString()`.

## License

[MIT](LICENSE) © [Thiago Delgado Pinto](https://github.com/thiagodp)
