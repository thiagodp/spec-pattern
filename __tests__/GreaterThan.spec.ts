import { GreaterThan } from "..";

describe( 'GreaterThan', () => {

    describe( 'satisfied by', () => {

        it( 'greater value', () => {
            expect(
                ( new GreaterThan( 0 ) ).isSatisfiedBy( 1 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'same value', () => {
            expect(
                ( new GreaterThan( 0 ) ).isSatisfiedBy( 0 )
            ).toBeFalsy();
        } );

        it( 'lesser value', () => {
            expect(
                ( new GreaterThan( 0 ) ).isSatisfiedBy( -1 )
            ).toBeFalsy();
        } );

    } );

} );
