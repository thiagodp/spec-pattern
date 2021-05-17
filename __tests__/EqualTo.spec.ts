import { EqualTo, equalTo, sameTypeAs } from '..';

describe( 'EqualTo', () => {

    describe( 'satisfied by', () => {

        it( 'same value, both integer numbers', () => {
            expect(
                ( new EqualTo( 0 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

        it( 'same value, number and string', () => {
            expect(
                ( new EqualTo( 0 ) ).isSatisfiedBy( '0' )
            ).toBeTruthy();
        } );

        it( 'same value, string and number', () => {
            expect(
                ( new EqualTo( '0' ) ).isSatisfiedBy( 0.0 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'a different value', () => {
            expect(
                ( new EqualTo( 0 ) ).isSatisfiedBy( 1 )
            ).toBeFalsy();
        } );

        it( 'two arrays', () => {
            expect(
                ( new EqualTo( [ 1, 2 ] ) ).isSatisfiedBy( [ 1, 2 ] )
            ).toBeFalsy();
        } );

        it( 'two objects', () => {
            expect(
                ( new EqualTo( { "a": 10 }) ).isSatisfiedBy( { "a": 10 } )
            ).toBeFalsy();
        } );

    } );

    it( 'sugar works', () => {
        const sugar = equalTo( 1 );
        const noSugar = new EqualTo( 1 );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );
