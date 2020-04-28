import { SameValueAs } from "..";

describe( 'SameValueAs', () => {

    describe( 'satisfied by', () => {

        it( 'same value, both integer numbers', () => {
            expect(
                ( new SameValueAs( 0 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

        it( 'same value, number and string', () => {
            expect(
                ( new SameValueAs( 0 ) ).isSatisfiedBy( '0' )
            ).toBeTruthy();
        } );

        it( 'same value, string and number', () => {
            expect(
                ( new SameValueAs( '0' ) ).isSatisfiedBy( 0.0 )
            ).toBeTruthy();
        } );

        it( 'two equal arrays', () => {
            expect(
                ( new SameValueAs( [ 1, 2 ] ) ).isSatisfiedBy( [ 1, 2 ] )
            ).toBeTruthy();
        } );

        it( 'two equal objects', () => {
            expect(
                ( new SameValueAs( { "a": 10 }) ).isSatisfiedBy( { "a": 10 } )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'a different value', () => {
            expect(
                ( new SameValueAs( 0 ) ).isSatisfiedBy( 1 )
            ).toBeFalsy();
        } );

        it( 'two different arrays', () => {
            expect(
                ( new SameValueAs( [ 1, 2, 3 ] ) ).isSatisfiedBy( [ 1, 2 ] )
            ).toBeFalsy();
        } );

        it( 'two different objects', () => {
            expect(
                ( new SameValueAs( { "a": 10 }) ).isSatisfiedBy( { "a": 11 } )
            ).toBeFalsy();
        } );

    } );

} );
