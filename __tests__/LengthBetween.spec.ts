import { LengthBetween } from "..";

describe( 'LengthBetween', () => {

    describe( 'satisfied by', () => {

        it( 'min', () => {
            expect(
                ( new LengthBetween( 2, 5 ) ).isSatisfiedBy( 'hi' )
            ).toBeTruthy();
        } );

        it( 'max', () => {
            expect(
                ( new LengthBetween( 2, 5 ) ).isSatisfiedBy( 'hello' )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'under min', () => {
            expect(
                ( new LengthBetween( 2, 5 ) ).isSatisfiedBy( '!' )
            ).toBeFalsy();
        } );

        it( 'above max', () => {
            expect(
                ( new LengthBetween( 2, 5 ) ).isSatisfiedBy( 'loooooonger' )
            ).toBeFalsy();
        } );

    } );

} );