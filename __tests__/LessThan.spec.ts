import { LessThan } from "..";

describe( 'LessThan', () => {

    describe( 'satisfied by', () => {

        it( 'lesser value', () => {
            expect(
                ( new LessThan( 0 ) ).isSatisfiedBy( -1 )
            ).toBeTruthy();
        } );

    } );

    describe( 'not satisfied by', () => {

        it( 'equal value', () => {
            expect(
                ( new LessThan( 0 ) ).isSatisfiedBy( 0 )
            ).toBeFalsy();
        } );

        it( 'greater value', () => {
            expect(
                ( new LessThan( 0 ) ).isSatisfiedBy( 1 )
            ).toBeFalsy();
        } );

    } );

} );