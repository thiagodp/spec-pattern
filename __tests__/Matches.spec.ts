import { Matches } from "..";

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

} );