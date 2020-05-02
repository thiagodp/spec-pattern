import { Any, Spec } from "..";

describe( 'Any', () => {
	const createFakeUnsatisfiedSpec: () => Spec<any, any> = () => ({
		isSatisfiedBy(candidate: any): boolean {return false; }
	} as Spec<any, any>);

	const createFakeSatisfiedSpec: () => Spec<any, any> = () => ({
		isSatisfiedBy(candidate: any): boolean { return true; }
	} as Spec<any, any>);

	describe( 'satisfied by', () => {

		it( 'empty input', () => {
			expect(
				( new Any() ).isSatisfiedBy( {} )
			).toBeTruthy();
		} );

		it( 'single passing Spec', () => {
			expect(
				( new Any(createFakeSatisfiedSpec()) ).isSatisfiedBy( {} )
			).toBeTruthy();
		} );

		it( 'at least one passing Spec', () => {
			const any = new Any(createFakeSatisfiedSpec(),
								createFakeUnsatisfiedSpec(),
								createFakeUnsatisfiedSpec());

			expect(any.isSatisfiedBy( {} )).toBeTruthy();
		} );

	} );

	describe( 'not satisfied by', () => {

		it( 'no passing Spec', () => {
			expect(
				( new Any( createFakeUnsatisfiedSpec(), createFakeUnsatisfiedSpec() ) ).isSatisfiedBy( 0 )
			).toBeFalsy();
		} );

	} );

} );
