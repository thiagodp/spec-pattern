import { EndsWith } from "..";

describe( 'EndsWith', () => {

    describe( 'satisfied by', () => {

        it( 'case sensitive', () => {
            expect(
                ( new EndsWith( 'world' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeTruthy();
        } );

        it( 'case insensitive', () => {
            expect(
                ( new EndsWith( 'World', true ) ).isSatisfiedBy( 'hello world' )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'value that is not in the end', () => {
            expect(
                ( new EndsWith( 'hello' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

        it( 'different case when not insensitive', () => {
            expect(
                ( new EndsWith( 'World' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

    } );

} );
