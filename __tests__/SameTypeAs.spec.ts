import { sameTypeAs, SameTypeAs } from "..";

class A {}
class B {}
class AChild extends A {}

describe( 'SameTypeAs', () => {

    describe( 'satisfied by', () => {

        it( 'number, number', () => {
            expect( ( new SameTypeAs( 10 ) ).isSatisfiedBy( 10 ) ).toBeTruthy();
        } );

        it( 'object, object', () => {
            expect( ( new SameTypeAs( { "a": 10 } ) ).isSatisfiedBy( { "b": 20 } ) ).toBeTruthy();
        } );

        it( 'array, array', () => {
            expect( ( new SameTypeAs( [ 10 ] ) ).isSatisfiedBy( [ 20 ] ) ).toBeTruthy();
        } );

        it( 'same classes', () => {
            expect( ( new SameTypeAs( new A() ) ).isSatisfiedBy( new A() ) ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'number, boolean', () => {
            expect( ( new SameTypeAs( true ) ).isSatisfiedBy( 1 ) ).toBeFalsy();
        } );

        it( 'different classes', () => {
            expect( ( new SameTypeAs( new A() ) ).isSatisfiedBy( new B() ) ).toBeFalsy();
        } );

        it( 'child classes', () => {
            expect( ( new SameTypeAs( new A() ) ).isSatisfiedBy( new AChild() ) ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = sameTypeAs( true );
        const noSugar = new SameTypeAs( true );
        expect( new SameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );