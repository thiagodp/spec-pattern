import { Between, between, sameTypeAs } from '..';

describe( 'Between', () => {

    describe( 'satisfied by', () => {

        it( 'min', () => {
            expect(
                ( new Between( -1, 1 ) ).isSatisfiedBy( -1 )
            ).toBeTruthy();
        } );

        it( 'max', () => {
            expect(
                ( new Between( -1, 1 ) ).isSatisfiedBy( 1 )
            ).toBeTruthy();
        } );

        it( 'any value between', () => {
            expect(
                ( new Between( -1, 1 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

    } );


    describe( 'not satisfied by', () => {

        it( 'less than min', () => {
            expect(
                ( new Between( -1, 1 ) ).isSatisfiedBy( -2 )
            ).toBeFalsy();
        } );

        it( 'greater than max', () => {
            expect(
                ( new Between( -1, 1 ) ).isSatisfiedBy( 2 )
            ).toBeFalsy();
        } );

    } );


    describe( 'composition of', () => {

        describe( 'not', () => {

            it( 'satisfied by - inverted logic', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .not()
                    .isSatisfiedBy( 0 )
                ).toBeFalsy();
            } );

        } );


        describe( 'or', () => {

            it( 'satisfied by - left side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .or( new Between( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'satisfied by - right side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .or( new Between( 5, 7 ) )
                    .isSatisfiedBy( 6 )
                ).toBeTruthy();
            } );

            it( 'not satisfied by - when in none', () => {
                expect(
                    ( new Between( -3, -1 ) )
                    .or( new Between( 1, 3 ) )
                    .isSatisfiedBy( 0 )
                ).toBeFalsy();
            } );

        } );


        describe( 'and', () => {

            it( 'satisfied by - when in both', () => {
                expect(
                    ( new Between( -3, 0 ) )
                    .and( new Between( 0, 3 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'not satisfied by - when only in left side', () => {
                expect(
                    ( new Between( -3, 0 ) )
                    .and( new Between( 0, 3 ) )
                    .isSatisfiedBy( -1 )
                ).toBeFalsy();
            } );

            it( 'not satisfied by - when only in right side', () => {
                expect(
                    ( new Between( -3, 0 ) )
                    .and( new Between( 0, 3 ) )
                    .isSatisfiedBy( 1 )
                ).toBeFalsy();
            } );

            it( 'not satisfied by - when in node side', () => {
                expect(
                    ( new Between( -3, 0 ) )
                    .and( new Between( 0, 3 ) )
                    .isSatisfiedBy( 4 )
                ).toBeFalsy();
            } );

        } );


        describe( 'orNot', () => {

            it( 'satisfied by - left side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .orNot( new Between( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'satisfied by - not in right side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .orNot( new Between( 5, 7 ) )
                    .isSatisfiedBy( 8 )
                ).toBeTruthy();
            } );

            it( 'not satisfied by - right side', () => {
                expect(
                    ( new Between( -3, -1 ) )
                    .orNot( new Between( 1, 3 ) )
                    .isSatisfiedBy( 2 )
                ).toBeFalsy();
            } );

        } );


        describe( 'andNot', () => {

            it( 'satisfied by - left side and not right', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .andNot( new Between( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'not satisfied by - in right side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .andNot( new Between( 5, 7 ) )
                    .isSatisfiedBy( 6 )
                ).toBeFalsy();
            } );

            it( 'not satisfied by - node side', () => {
                expect(
                    ( new Between( -1, 1 ) )
                    .andNot( new Between( 5, 7 ) )
                    .isSatisfiedBy( 8 )
                ).toBeFalsy();
            } );

        } );

    } );


    it( 'sugar works', () => {
        const sugar = between( -1, 1 );
        const noSugar = new Between( -1, 1 );
        expect( sameTypeAs( sugar ).isSatisfiedBy( noSugar ) ).toBeTruthy();
    } );

} );
