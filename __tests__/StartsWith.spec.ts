import { StartsWith } from "..";

describe( 'StartsWith', () => {

    describe( 'satisfied by', () => {

        it( 'case sensitive comparison', () => {
            expect(
                ( new StartsWith( 'Hello' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeTruthy();
        } );

        it( 'case insensitive comparison', () => {
            expect(
                ( new StartsWith( 'Hello', true ) ).isSatisfiedBy( 'hello world' )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'not in the start', () => {
            expect(
                ( new StartsWith( 'world' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

        it( 'different case when not insensitive', () => {
            expect(
                ( new StartsWith( 'hello' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

    } );

} );

