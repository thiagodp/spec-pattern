import { Empty } from "..";

describe( 'Empty', () => {

    describe( 'satisfied by', () => {

        it( 'empty string', () => {
            expect( ( new Empty() ).isSatisfiedBy( '' ) ).toBeTruthy();
        } );

        it( 'empty array', () => {
            expect( ( new Empty() ).isSatisfiedBy( [] ) ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'undefined', () => {
            expect( ( new Empty() ).isSatisfiedBy( undefined ) ).toBeFalsy();
        } );

        it( 'null', () => {
            expect( ( new Empty() ).isSatisfiedBy( null ) ).toBeFalsy();
        } );

        it( 'zero', () => {
            expect( ( new Empty() ).isSatisfiedBy( 0 ) ).toBeFalsy();
        } );

        it( 'not empty string', () => {
            expect( ( new Empty() ).isSatisfiedBy( ' ' ) ).toBeFalsy();
        } );

        it( 'not empty array', () => {
            expect( ( new Empty() ).isSatisfiedBy( [ 1 ] ) ).toBeFalsy();
        } );

    } );

} );