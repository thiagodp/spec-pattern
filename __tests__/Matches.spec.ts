import { matches, Matches, sameTypeAs } from "..";

describe( 'Matches', () => {

    describe( 'satisfied by', () => {

        it( 'value that matches', () => {
            expect(
                ( new Matches( /^foo$/ ) ).isSatisfiedBy( 'foo' )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'value that does not match', () => {
            expect(
                ( new Matches( /^foo$/ ) ).isSatisfiedBy( 'bar' )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = matches( /^foo$/ );
        const noSugar = new Matches( /^foo$/ );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );