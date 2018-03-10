"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('equal to', function () {
    it('right', function () {
        expect((new index_1.EqualTo_(0))
            .isSatisfiedBy(0)).toBeTruthy();
    });
    it('wrong', function () {
        expect((new index_1.EqualTo_(0))
            .isSatisfiedBy(1)).toBeFalsy();
    });
});
describe('greater than', function () {
    it('right', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(1)).toBeTruthy();
    });
    it('wrong - equal', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(0)).toBeFalsy();
    });
    it('wrong - lesser', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(-1)).toBeFalsy();
    });
});
describe('greater than or equal to', function () {
    it('right - greater', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(1)).toBeTruthy();
    });
    it('right - equal', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(0)).toBeFalsy();
    });
    it('wrong - lesser', function () {
        expect((new index_1.GreaterThan_(0))
            .isSatisfiedBy(-1)).toBeFalsy();
    });
});
describe('less than', function () {
    it('right', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(-1)).toBeTruthy();
    });
    it('wrong - equal', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(0)).toBeFalsy();
    });
    it('wrong - greater', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(1)).toBeFalsy();
    });
});
describe('less than or equal to', function () {
    it('right - lesser', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(-1)).toBeTruthy();
    });
    it('right - equal', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(0)).toBeFalsy();
    });
    it('wrong - greater', function () {
        expect((new index_1.LessThan_(0))
            .isSatisfiedBy(1)).toBeFalsy();
    });
});
describe('starts with', function () {
    it('right - case sensitive', function () {
        expect((new index_1.StartsWith_('Hello'))
            .isSatisfiedBy('Hello world')).toBeTruthy();
    });
    it('right - case insensitive', function () {
        expect((new index_1.StartsWith_('Hello', true))
            .isSatisfiedBy('hello world')).toBeTruthy();
    });
    it('wrong - not in the start', function () {
        expect((new index_1.StartsWith_('world'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
    it('wrong - different case when not insensitive', function () {
        expect((new index_1.StartsWith_('hello'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
});
describe('ends with', function () {
    it('right - case sensitive', function () {
        expect((new index_1.EndsWith_('world'))
            .isSatisfiedBy('Hello world')).toBeTruthy();
    });
    it('right - case insensitive', function () {
        expect((new index_1.EndsWith_('World', true))
            .isSatisfiedBy('hello world')).toBeTruthy();
    });
    it('wrong - not in the end', function () {
        expect((new index_1.EndsWith_('hello'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
    it('wrong - different case when not insensitive', function () {
        expect((new index_1.EndsWith_('World'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
});
describe('contains', function () {
    it('right - case sensitive', function () {
        expect((new index_1.Contains_('w'))
            .isSatisfiedBy('Hello world')).toBeTruthy();
    });
    it('right - case insensitive', function () {
        expect((new index_1.Contains_('W', true))
            .isSatisfiedBy('hello world')).toBeTruthy();
    });
    it('wrong - not exists', function () {
        expect((new index_1.Contains_('x'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
    it('wrong - different case when not insensitive', function () {
        expect((new index_1.Contains_('W'))
            .isSatisfiedBy('Hello world')).toBeFalsy();
    });
});
describe('in', function () {
    it('right - found', function () {
        expect((new index_1.In_([1, 2, 3]))
            .isSatisfiedBy(2)).toBeTruthy();
    });
    it('wrong - not found', function () {
        expect((new index_1.In_([1, 2, 3]))
            .isSatisfiedBy(0)).toBeFalsy();
    });
});
describe('between', function () {
    describe('right', function () {
        it('min', function () {
            expect((new index_1.Between_(-1, 1)).isSatisfiedBy(-1)).toBeTruthy();
        });
        it('max', function () {
            expect((new index_1.Between_(-1, 1)).isSatisfiedBy(1)).toBeTruthy();
        });
        it('any value between', function () {
            expect((new index_1.Between_(-1, 1)).isSatisfiedBy(0)).toBeTruthy();
        });
    });
    describe('wrong', function () {
        it('less than min', function () {
            expect((new index_1.Between_(-1, 1)).isSatisfiedBy(-2)).toBeFalsy();
        });
        it('greater than max', function () {
            expect((new index_1.Between_(-1, 1)).isSatisfiedBy(2)).toBeFalsy();
        });
    });
    describe('composition', function () {
        describe('with not', function () {
            it('right - invert the logic', function () {
                expect((new index_1.Between_(-1, 1))
                    .not()
                    .isSatisfiedBy(0)).toBeFalsy();
            });
        });
        describe('with or', function () {
            it('right - left side', function () {
                expect((new index_1.Between_(-1, 1))
                    .or(new index_1.Between_(5, 7))
                    .isSatisfiedBy(0)).toBeTruthy();
            });
            it('right - right side', function () {
                expect((new index_1.Between_(-1, 1))
                    .or(new index_1.Between_(5, 7))
                    .isSatisfiedBy(6)).toBeTruthy();
            });
            it('wrong - when in none', function () {
                expect((new index_1.Between_(-3, -1))
                    .or(new index_1.Between_(1, 3))
                    .isSatisfiedBy(0)).toBeFalsy();
            });
        });
        describe('with and', function () {
            it('right - when in both', function () {
                expect((new index_1.Between_(-3, 0))
                    .and(new index_1.Between_(0, 3))
                    .isSatisfiedBy(0)).toBeTruthy();
            });
            it('wrong - when only in left side', function () {
                expect((new index_1.Between_(-3, 0))
                    .and(new index_1.Between_(0, 3))
                    .isSatisfiedBy(-1)).toBeFalsy();
            });
            it('wrong - when only in right side', function () {
                expect((new index_1.Between_(-3, 0))
                    .and(new index_1.Between_(0, 3))
                    .isSatisfiedBy(1)).toBeFalsy();
            });
            it('wrong - when in node side', function () {
                expect((new index_1.Between_(-3, 0))
                    .and(new index_1.Between_(0, 3))
                    .isSatisfiedBy(4)).toBeFalsy();
            });
        });
        describe('with or not', function () {
            it('right - left side', function () {
                expect((new index_1.Between_(-1, 1))
                    .orNot(new index_1.Between_(5, 7))
                    .isSatisfiedBy(0)).toBeTruthy();
            });
            it('right - not in right side', function () {
                expect((new index_1.Between_(-1, 1))
                    .orNot(new index_1.Between_(5, 7))
                    .isSatisfiedBy(8)).toBeTruthy();
            });
            it('wrong - right side', function () {
                expect((new index_1.Between_(-3, -1))
                    .orNot(new index_1.Between_(1, 3))
                    .isSatisfiedBy(2)).toBeFalsy();
            });
        });
        describe('with and not', function () {
            it('right - left side and not right', function () {
                expect((new index_1.Between_(-1, 1))
                    .andNot(new index_1.Between_(5, 7))
                    .isSatisfiedBy(0)).toBeTruthy();
            });
            it('wrong - in right side', function () {
                expect((new index_1.Between_(-1, 1))
                    .andNot(new index_1.Between_(5, 7))
                    .isSatisfiedBy(6)).toBeFalsy();
            });
            it('wrong - node side', function () {
                expect((new index_1.Between_(-1, 1))
                    .andNot(new index_1.Between_(5, 7))
                    .isSatisfiedBy(8)).toBeFalsy();
            });
        });
    });
});
describe('length between', function () {
    it('right - min', function () {
        expect((new index_1.LengthBetween_(2, 5))
            .isSatisfiedBy('hi')).toBeTruthy();
    });
    it('right - max', function () {
        expect((new index_1.LengthBetween_(2, 5))
            .isSatisfiedBy('hello')).toBeTruthy();
    });
    it('wrong - under min', function () {
        expect((new index_1.LengthBetween_(2, 5))
            .isSatisfiedBy('!')).toBeFalsy();
    });
    it('wrong - above max', function () {
        expect((new index_1.LengthBetween_(2, 5))
            .isSatisfiedBy('loooooonger')).toBeFalsy();
    });
});
//# sourceMappingURL=index.spec.js.map