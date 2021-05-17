import { Contains, contains, sameTypeAs } from '..';

describe( 'Contains', () => {

    describe( 'correct', () => {

        it( 'case sensitive comparison', () => {
            expect(
                ( new Contains( 'w' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeTruthy();
        } );

        it( 'case insensitive comparison', () => {
            expect(
                ( new Contains( 'W', true ) ).isSatisfiedBy( 'hello world' )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'value that not exists', () => {
            expect(
                ( new Contains( 'x' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

        it( 'different case when not insensitive', () => {
            expect(
                ( new Contains( 'W' ) ).isSatisfiedBy( 'Hello world' )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = contains( 'x' );
        const noSugar = new Contains( 'x' );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );
