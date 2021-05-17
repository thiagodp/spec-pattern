import { greaterThan, GreaterThan, sameTypeAs } from "..";

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

    it( 'sugar works', () => {
        const sugar = greaterThan( 1 );
        const noSugar = new GreaterThan( 1 );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );
