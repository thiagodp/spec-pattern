import { Between_, Composite_, In_, EqualTo_, GreaterThan_, LessThan_, StartsWith_, EndsWith_, Contains_, LengthBetween_, Matches_ } from "../index";


describe( 'equal to', () => {

    it( 'right', () => {
        expect(
            ( new EqualTo_( 0 ) )
            .isSatisfiedBy( 0 )
        ).toBeTruthy();
    } );

    it( 'wrong', () => {
        expect(
            ( new EqualTo_( 0 ) )
            .isSatisfiedBy( 1 )
        ).toBeFalsy();
    } );    

} );


describe( 'greater than', () => {

    it( 'right', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( 1 )
        ).toBeTruthy();
    } );

    it( 'wrong - equal', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( 0 )
        ).toBeFalsy();
    } );

    it( 'wrong - lesser', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( -1 )
        ).toBeFalsy();
    } );    

} );


describe( 'greater than or equal to', () => {

    it( 'right - greater', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( 1 )
        ).toBeTruthy();
    } );

    it( 'right - equal', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( 0 )
        ).toBeFalsy();
    } );

    it( 'wrong - lesser', () => {
        expect(
            ( new GreaterThan_( 0 ) )
            .isSatisfiedBy( -1 )
        ).toBeFalsy();
    } );    

} );


describe( 'less than', () => {

    it( 'right', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( -1 )
        ).toBeTruthy();
    } );

    it( 'wrong - equal', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( 0 )
        ).toBeFalsy();
    } );

    it( 'wrong - greater', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( 1 )
        ).toBeFalsy();
    } );    

} );


describe( 'less than or equal to', () => {

    it( 'right - lesser', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( -1 )
        ).toBeTruthy();
    } );

    it( 'right - equal', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( 0 )
        ).toBeFalsy();
    } );

    it( 'wrong - greater', () => {
        expect(
            ( new LessThan_( 0 ) )
            .isSatisfiedBy( 1 )
        ).toBeFalsy();
    } );    

} );



describe( 'starts with', () => {

    it( 'right - case sensitive', () => {
        expect(
            ( new StartsWith_( 'Hello' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeTruthy();
    } );

    it( 'right - case insensitive', () => {
        expect(
            ( new StartsWith_( 'Hello', true ) )
            .isSatisfiedBy( 'hello world' )
        ).toBeTruthy();
    } );    

    it( 'wrong - not in the start', () => {
        expect(
            ( new StartsWith_( 'world' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );

    it( 'wrong - different case when not insensitive', () => {
        expect(
            ( new StartsWith_( 'hello' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );    

} );



describe( 'ends with', () => {

    it( 'right - case sensitive', () => {
        expect(
            ( new EndsWith_( 'world' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeTruthy();
    } );

    it( 'right - case insensitive', () => {
        expect(
            ( new EndsWith_( 'World', true ) )
            .isSatisfiedBy( 'hello world' )
        ).toBeTruthy();
    } );    

    it( 'wrong - not in the end', () => {
        expect(
            ( new EndsWith_( 'hello' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );

    it( 'wrong - different case when not insensitive', () => {
        expect(
            ( new EndsWith_( 'World' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );    

} );


describe( 'contains', () => {

    it( 'right - case sensitive', () => {
        expect(
            ( new Contains_( 'w' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeTruthy();
    } );

    it( 'right - case insensitive', () => {
        expect(
            ( new Contains_( 'W', true ) )
            .isSatisfiedBy( 'hello world' )
        ).toBeTruthy();
    } );    

    it( 'wrong - not exists', () => {
        expect(
            ( new Contains_( 'x' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );

    it( 'wrong - different case when not insensitive', () => {
        expect(
            ( new Contains_( 'W' ) )
            .isSatisfiedBy( 'Hello world' )
        ).toBeFalsy();
    } );    

} );


describe( 'in', () => {

    it( 'right - found', () => {
        expect(
            ( new In_( [ 1, 2, 3 ] ) )
            .isSatisfiedBy( 2 )
        ).toBeTruthy();
    } );

    it( 'wrong - not found', () => {
        expect(
            ( new In_( [ 1, 2, 3 ] ) )
            .isSatisfiedBy( 0 )
        ).toBeFalsy();
    } );    

} );


describe( 'between', () => {


    describe( 'right', () => {

        it( 'min', () => {
            expect( 
                ( new Between_( -1, 1 ) ).isSatisfiedBy( -1 )
            ).toBeTruthy();
        } );

        it( 'max', () => {
            expect( 
                ( new Between_( -1, 1 ) ).isSatisfiedBy( 1 )
            ).toBeTruthy();
        } );

        it( 'any value between', () => {
            expect( 
                ( new Between_( -1, 1 ) ).isSatisfiedBy( 0 )
            ).toBeTruthy();
        } );

    } );


    describe( 'wrong', () => {

        it( 'less than min', () => {
            expect( 
                ( new Between_( -1, 1 ) ).isSatisfiedBy( -2 )
            ).toBeFalsy();
        } );

        it( 'greater than max', () => {
            expect( 
                ( new Between_( -1, 1 ) ).isSatisfiedBy( 2 )
            ).toBeFalsy();
        } );            

    } );


    describe( 'composition', () => {


        describe( 'with not', () => {

            it( 'right - invert the logic', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .not()
                    .isSatisfiedBy( 0 )
                ).toBeFalsy();
            } );

        } );    


        describe( 'with or', () => {

            it( 'right - left side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .or( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'right - right side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .or( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 6 )
                ).toBeTruthy();
            } );

            it( 'wrong - when in none', () => {
                expect(
                    ( new Between_( -3, -1 ) )
                    .or( new Between_( 1, 3 ) )
                    .isSatisfiedBy( 0 )
                ).toBeFalsy();
            } );        

        } );


        describe( 'with and', () => {

            it( 'right - when in both', () => {
                expect(
                    ( new Between_( -3, 0 ) )
                    .and( new Between_( 0, 3 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'wrong - when only in left side', () => {
                expect(
                    ( new Between_( -3, 0 ) )
                    .and( new Between_( 0, 3 ) )
                    .isSatisfiedBy( -1 )
                ).toBeFalsy();
            } );

            it( 'wrong - when only in right side', () => {
                expect(
                    ( new Between_( -3, 0 ) )
                    .and( new Between_( 0, 3 ) )
                    .isSatisfiedBy( 1 )
                ).toBeFalsy();
            } );

            it( 'wrong - when in node side', () => {
                expect(
                    ( new Between_( -3, 0 ) )
                    .and( new Between_( 0, 3 ) )
                    .isSatisfiedBy( 4 )
                ).toBeFalsy();
            } );

        } );


        describe( 'with or not', () => {

            it( 'right - left side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .orNot( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'right - not in right side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .orNot( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 8 )
                ).toBeTruthy();
            } );

            it( 'wrong - right side', () => {
                expect(
                    ( new Between_( -3, -1 ) )
                    .orNot( new Between_( 1, 3 ) )
                    .isSatisfiedBy( 2 )
                ).toBeFalsy();
            } );        

        } );
        

        describe( 'with and not', () => {

            it( 'right - left side and not right', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .andNot( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 0 )
                ).toBeTruthy();
            } );

            it( 'wrong - in right side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .andNot( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 6 )
                ).toBeFalsy();
            } );

            it( 'wrong - node side', () => {
                expect(
                    ( new Between_( -1, 1 ) )
                    .andNot( new Between_( 5, 7 ) )
                    .isSatisfiedBy( 8 )
                ).toBeFalsy();
            } );        

        } );

    } );    

} );


describe( 'length between', () => {

    it( 'right - min', () => {
        expect(
            ( new LengthBetween_( 2, 5 ) )
            .isSatisfiedBy( 'hi' )
        ).toBeTruthy();
    } );

    it( 'right - max', () => {
        expect(
            ( new LengthBetween_( 2, 5 ) )
            .isSatisfiedBy( 'hello' )
        ).toBeTruthy();
    } );    

    it( 'wrong - under min', () => {
        expect(
            ( new LengthBetween_( 2, 5 ) )
            .isSatisfiedBy( '!' )
        ).toBeFalsy();
    } );

    it( 'wrong - above max', () => {
        expect(
            ( new LengthBetween_( 2, 5 ) )
            .isSatisfiedBy( 'loooooonger' )
        ).toBeFalsy();
    } );    

} );


describe( 'matches', () => {

    it( 'right', () => {
        expect(
            ( new Matches_( /^foo$/ ) )
            .isSatisfiedBy( 'foo' )
        ).toBeTruthy();
    } );

    it( 'wrong', () => {
        expect(
            ( new Matches_( /^foo$/ ) )
            .isSatisfiedBy( 'bar' )
        ).toBeFalsy();
    } );    

} );