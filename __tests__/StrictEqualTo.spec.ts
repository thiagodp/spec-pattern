import { StrictEqualTo } from "..";

describe( 'StrictEqualTo', () => {

    describe( 'satisfied by', () => {

        it( 'same value, both integer numbers', () => {
            expect(
                ( new StrictEqualTo( 0 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

        it( 'same value, integer and double', () => {
            expect(
                ( new StrictEqualTo( 0 ) ).isSatisfiedBy( 0.0 )
            ).toBeTruthy();
        } );

        it( 'same value, both double numbers', () => {
            expect(
                ( new StrictEqualTo( 0.0 ) ).isSatisfiedBy( 0.0 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'same value with a different type', () => {
            expect(
                ( new StrictEqualTo( 0 ) ).isSatisfiedBy( '0' )
            ).toBeFalsy();
        } );

        it( 'different value', () => {
            expect(
                ( new StrictEqualTo( 0 ) ).isSatisfiedBy( 1 )
            ).toBeFalsy();
        } );

    } );

} );