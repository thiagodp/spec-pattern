import { greaterThanOrEqualTo, GreaterThanOrEqualTo, sameTypeAs } from "..";

describe( 'GreaterThanOrEqualTo', () => {

    describe( 'satisfied by', () => {

        it( 'greater value', () => {
            expect(
                ( new GreaterThanOrEqualTo( 0 ) ).isSatisfiedBy( 1 )
            ).toBeTruthy();
        } );

        it( 'equal value', () => {
            expect(
                ( new GreaterThanOrEqualTo( 0 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'lesser value', () => {
            expect(
                ( new GreaterThanOrEqualTo( 0 ) ).isSatisfiedBy( -1 )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = greaterThanOrEqualTo( 1 );
        const noSugar = new GreaterThanOrEqualTo( 1 );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );