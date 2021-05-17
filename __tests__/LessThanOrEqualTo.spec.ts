import { lessThanOrEqualTo, LessThanOrEqualTo, sameTypeAs } from "..";

describe( 'LessThanOrEqualTo', () => {

    describe( 'satisfied by', () => {

        it( 'lesser value', () => {
            expect(
                ( new LessThanOrEqualTo( 0 ) ).isSatisfiedBy( -1 )
            ).toBeTruthy();
        } );

        it( 'equal value', () => {
            expect(
                ( new LessThanOrEqualTo( 0 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'greater value', () => {
            expect(
                ( new LessThanOrEqualTo( 0 ) ).isSatisfiedBy( 1 )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = lessThanOrEqualTo( 1 );
        const noSugar = new LessThanOrEqualTo( 1 );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );
