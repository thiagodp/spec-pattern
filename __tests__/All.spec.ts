import { All, Spec } from "..";

describe( 'All', () => {

	const createFakeUnsatisfiedSpec: () => Spec< any, any > = () => (
		{
			isSatisfiedBy( candidate: any ): boolean { return false; }
		} as Spec< any, any >
	);

	const createFakeSatisfiedSpec: () => Spec< any, any > = () => (
		{
			isSatisfiedBy( candidate: any ): boolean { return true; }
		} as Spec< any, any >
	);

	describe( 'satisfied by', () => {

		it( 'empty input', () => {
			expect(
				( new All() ).isSatisfiedBy( {} )
			).toBeTruthy();
		} );

		it( 'only passing Specs', () => {

			const all = new All(
				createFakeSatisfiedSpec(),
				createFakeSatisfiedSpec()
				);

			expect( all.isSatisfiedBy( {} ) ).toBeTruthy();
		} );

	} );

	describe( 'not satisfied by', () => {

		it( 'at least one failing Spec', () => {
			const all = new All(
				createFakeSatisfiedSpec(),
				createFakeUnsatisfiedSpec()
			);
			expect( all.isSatisfiedBy( 0 ) ).toBeFalsy();
		} );

	} );

} );
