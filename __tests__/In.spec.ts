import { In, isIn, sameTypeAs } from "..";

describe( 'In', () => {

    describe( 'satisfied by', () => {

        it( 'value found', () => {
            expect(
                ( new In( [ 1, 2, 3 ] ) ).isSatisfiedBy( 2 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'not found', () => {
            expect(
                ( new In( [ 1, 2, 3 ] ) ).isSatisfiedBy( 0 )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = isIn( [ 1 , 2, 3 ] );
        const noSugar = new In( [ 1, 2, 3 ] );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );