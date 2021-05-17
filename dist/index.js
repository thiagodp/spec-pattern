"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.All = exports.any = exports.Any = exports.matches = exports.Matches = exports.empty = exports.Empty = exports.lengthBetween = exports.LengthBetween = exports.between = exports.Between = exports.isIn = exports.In = exports.contains = exports.Contains = exports.endsWith = exports.EndsWith = exports.startsWith = exports.StartsWith = exports.lessThanOrEqualTo = exports.LessThanOrEqualTo = exports.lessThan = exports.LessThan = exports.greaterThanOrEqualTo = exports.GreaterThanOrEqualTo = exports.greaterThan = exports.GreaterThan = exports.sameTypeAs = exports.SameTypeAs = exports.sameValueAs = exports.SameValueAs = exports.strictEqualTo = exports.StrictEqualTo = exports.equalTo = exports.EqualTo = exports.not = exports.Not = exports.orNot = exports.OrNot = exports.or = exports.Or = exports.andNot = exports.AndNot = exports.and = exports.And = exports.Composite = void 0;
var Composite = /** @class */ (function () {
    function Composite() {
    }
    Composite.prototype.and = function (other) {
        return new And(this, other);
    };
    Composite.prototype.andNot = function (other) {
        return new AndNot(this, other);
    };
    Composite.prototype.or = function (other) {
        return new Or(this, other);
    };
    Composite.prototype.orNot = function (other) {
        return new OrNot(this, other);
    };
    Composite.prototype.not = function () {
        return new Not(this);
    };
    return Composite;
}());
exports.Composite = Composite;
// ---------------------------------------------------------------------------
var And = /** @class */ (function (_super) {
    __extends(And, _super);
    function And(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    And.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) && this._right.isSatisfiedBy(candidate);
    };
    And.prototype.toString = function () {
        return '(' + this._left.toString() + ' and ' + this._right.toString() + ')';
    };
    return And;
}(Composite));
exports.And = And;
// Syntax sugar
function and(left, right) {
    return new And(left, right);
}
exports.and = and;
// ---------------------------------------------------------------------------
var AndNot = /** @class */ (function (_super) {
    __extends(AndNot, _super);
    function AndNot(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    AndNot.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) && !this._right.isSatisfiedBy(candidate);
    };
    AndNot.prototype.toString = function () {
        return '(' + this._left.toString() + ' and not ' + this._right.toString() + ')';
    };
    return AndNot;
}(Composite));
exports.AndNot = AndNot;
// Syntax sugar
function andNot(left, right) {
    return new AndNot(left, right);
}
exports.andNot = andNot;
// ---------------------------------------------------------------------------
var Or = /** @class */ (function (_super) {
    __extends(Or, _super);
    function Or(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    Or.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) || this._right.isSatisfiedBy(candidate);
    };
    Or.prototype.toString = function () {
        return '(' + this._left.toString() + ' or ' + this._right.toString() + ')';
    };
    return Or;
}(Composite));
exports.Or = Or;
// Syntax sugar
function or(left, right) {
    return new Or(left, right);
}
exports.or = or;
// ---------------------------------------------------------------------------
var OrNot = /** @class */ (function (_super) {
    __extends(OrNot, _super);
    function OrNot(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    OrNot.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) || !this._right.isSatisfiedBy(candidate);
    };
    OrNot.prototype.toString = function () {
        return '(' + this._left.toString() + ' or not ' + this._right.toString() + ')';
    };
    return OrNot;
}(Composite));
exports.OrNot = OrNot;
// Syntax sugar
function orNot(left, right) {
    return new OrNot(left, right);
}
exports.orNot = orNot;
// ---------------------------------------------------------------------------
var Not = /** @class */ (function (_super) {
    __extends(Not, _super);
    function Not(_other) {
        var _this = _super.call(this) || this;
        _this._other = _other;
        return _this;
    }
    Not.prototype.isSatisfiedBy = function (candidate) {
        return !this._other.isSatisfiedBy(candidate);
    };
    Not.prototype.toString = function () {
        return '(not ' + this._other.toString() + ')';
    };
    return Not;
}(Composite));
exports.Not = Not;
// Syntax sugar
function not(other) {
    return new Not(other);
}
exports.not = not;
// ---------------------------------------------------------------------------
var EqualTo = /** @class */ (function (_super) {
    __extends(EqualTo, _super);
    function EqualTo(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    EqualTo.prototype.isSatisfiedBy = function (candidate) {
        return this._value == candidate;
    };
    EqualTo.prototype.toString = function () {
        return 'equal to ' + this._value;
    };
    return EqualTo;
}(Composite));
exports.EqualTo = EqualTo;
// Syntax sugar
function equalTo(value) {
    return new EqualTo(value);
}
exports.equalTo = equalTo;
// ---------------------------------------------------------------------------
var StrictEqualTo = /** @class */ (function (_super) {
    __extends(StrictEqualTo, _super);
    function StrictEqualTo(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    StrictEqualTo.prototype.isSatisfiedBy = function (candidate) {
        return this._value === candidate;
    };
    StrictEqualTo.prototype.toString = function () {
        return 'strict equal to ' + this._value;
    };
    return StrictEqualTo;
}(Composite));
exports.StrictEqualTo = StrictEqualTo;
// Syntax sugar
function strictEqualTo(value) {
    return new StrictEqualTo(value);
}
exports.strictEqualTo = strictEqualTo;
// ---------------------------------------------------------------------------
var SameValueAs = /** @class */ (function (_super) {
    __extends(SameValueAs, _super);
    function SameValueAs(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    SameValueAs.prototype.isSatisfiedBy = function (candidate) {
        var hasSimpleType = function (x) {
            return ['string', 'number', 'bigint', 'boolean', 'undefined'].indexOf(typeof x) >= 0;
        };
        if (hasSimpleType(candidate) && hasSimpleType(this._value)) {
            return candidate == this._value;
        }
        return JSON.stringify(candidate) == JSON.stringify(this._value);
    };
    SameValueAs.prototype.toString = function () {
        return 'has same value as ' + this._value;
    };
    return SameValueAs;
}(Composite));
exports.SameValueAs = SameValueAs;
// Syntax sugar
function sameValueAs(value) {
    return new SameValueAs(value);
}
exports.sameValueAs = sameValueAs;
// ---------------------------------------------------------------------------
var SameTypeAs = /** @class */ (function (_super) {
    __extends(SameTypeAs, _super);
    function SameTypeAs(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    SameTypeAs.prototype.isSatisfiedBy = function (candidate) {
        var notAnObject = function (x) { return typeof x != 'object'; };
        if (notAnObject(candidate) && notAnObject(this._value)) {
            return typeof candidate == typeof this._value;
        }
        return candidate.constructor.name == this._value.constructor.name;
    };
    SameTypeAs.prototype.toString = function () {
        return 'has same type as ' + this._value;
    };
    return SameTypeAs;
}(Composite));
exports.SameTypeAs = SameTypeAs;
// Syntax sugar
function sameTypeAs(value) {
    return new SameTypeAs(value);
}
exports.sameTypeAs = sameTypeAs;
// ---------------------------------------------------------------------------
var GreaterThan = /** @class */ (function (_super) {
    __extends(GreaterThan, _super);
    function GreaterThan(_min) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        return _this;
    }
    GreaterThan.prototype.isSatisfiedBy = function (candidate) {
        return candidate > this._min;
    };
    GreaterThan.prototype.toString = function () {
        return 'greater than ' + this._min;
    };
    return GreaterThan;
}(Composite));
exports.GreaterThan = GreaterThan;
// Syntax sugar
function greaterThan(min) {
    return new GreaterThan(min);
}
exports.greaterThan = greaterThan;
// ---------------------------------------------------------------------------
var GreaterThanOrEqualTo = /** @class */ (function (_super) {
    __extends(GreaterThanOrEqualTo, _super);
    function GreaterThanOrEqualTo(_min) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        return _this;
    }
    GreaterThanOrEqualTo.prototype.isSatisfiedBy = function (candidate) {
        return candidate >= this._min;
    };
    GreaterThanOrEqualTo.prototype.toString = function () {
        return 'greater than or equal to ' + this._min;
    };
    return GreaterThanOrEqualTo;
}(Composite));
exports.GreaterThanOrEqualTo = GreaterThanOrEqualTo;
// Syntax sugar
function greaterThanOrEqualTo(min) {
    return new GreaterThanOrEqualTo(min);
}
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
// ---------------------------------------------------------------------------
var LessThan = /** @class */ (function (_super) {
    __extends(LessThan, _super);
    function LessThan(_max) {
        var _this = _super.call(this) || this;
        _this._max = _max;
        return _this;
    }
    LessThan.prototype.isSatisfiedBy = function (candidate) {
        return candidate < this._max;
    };
    LessThan.prototype.toString = function () {
        return 'less than ' + this._max;
    };
    return LessThan;
}(Composite));
exports.LessThan = LessThan;
// Syntax sugar
function lessThan(max) {
    return new LessThan(max);
}
exports.lessThan = lessThan;
// ---------------------------------------------------------------------------
var LessThanOrEqualTo = /** @class */ (function (_super) {
    __extends(LessThanOrEqualTo, _super);
    function LessThanOrEqualTo(_max) {
        var _this = _super.call(this) || this;
        _this._max = _max;
        return _this;
    }
    LessThanOrEqualTo.prototype.isSatisfiedBy = function (candidate) {
        return candidate <= this._max;
    };
    LessThanOrEqualTo.prototype.toString = function () {
        return 'less than or equal to ' + this._max;
    };
    return LessThanOrEqualTo;
}(Composite));
exports.LessThanOrEqualTo = LessThanOrEqualTo;
// Syntax sugar
function lessThanOrEqualTo(max) {
    return new LessThanOrEqualTo(max);
}
exports.lessThanOrEqualTo = lessThanOrEqualTo;
// ---------------------------------------------------------------------------
var StartsWith = /** @class */ (function (_super) {
    __extends(StartsWith, _super);
    function StartsWith(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    StartsWith.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return 0 === c.indexOf(v);
    };
    StartsWith.prototype.toString = function () {
        return 'starts with ' + this._value;
    };
    return StartsWith;
}(Composite));
exports.StartsWith = StartsWith;
// Syntax sugar
function startsWith(value, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    return new StartsWith(value, ignoreCase);
}
exports.startsWith = startsWith;
// ---------------------------------------------------------------------------
var EndsWith = /** @class */ (function (_super) {
    __extends(EndsWith, _super);
    function EndsWith(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    EndsWith.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.substr(c.length - v.length, v.length) === v;
    };
    EndsWith.prototype.toString = function () {
        return 'ends with ' + this._value;
    };
    return EndsWith;
}(Composite));
exports.EndsWith = EndsWith;
// Syntax sugar
function endsWith(value, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    return new EndsWith(value, ignoreCase);
}
exports.endsWith = endsWith;
// ---------------------------------------------------------------------------
var Contains = /** @class */ (function (_super) {
    __extends(Contains, _super);
    function Contains(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    Contains.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.indexOf(v) !== -1;
    };
    Contains.prototype.toString = function () {
        return 'contains ' + this._value;
    };
    return Contains;
}(Composite));
exports.Contains = Contains;
// Syntax sugar
function contains(value, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    return new Contains(value, ignoreCase);
}
exports.contains = contains;
// ---------------------------------------------------------------------------
var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In(_values) {
        var _this = _super.call(this) || this;
        _this._values = _values;
        return _this;
    }
    In.prototype.isSatisfiedBy = function (candidate) {
        return this._values.indexOf(candidate) >= 0;
    };
    In.prototype.toString = function () {
        return 'in [' + this._values.join(', ') + ']';
    };
    return In;
}(Composite));
exports.In = In;
// Syntax sugar
function isIn(values) {
    return new In(values);
}
exports.isIn = isIn;
// ---------------------------------------------------------------------------
var Between = /** @class */ (function (_super) {
    __extends(Between, _super);
    function Between(_min, _max) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        _this._max = _max;
        return _this;
    }
    Between.prototype.isSatisfiedBy = function (candidate) {
        return candidate >= this._min && candidate <= this._max;
    };
    Between.prototype.toString = function () {
        return 'between (' + this._min + ', ' + this._max + ')';
    };
    return Between;
}(Composite));
exports.Between = Between;
// Syntax sugar
function between(min, max) {
    return new Between(min, max);
}
exports.between = between;
// ---------------------------------------------------------------------------
var LengthBetween = /** @class */ (function (_super) {
    __extends(LengthBetween, _super);
    function LengthBetween(_min, _max) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        _this._max = _max;
        return _this;
    }
    LengthBetween.prototype.isSatisfiedBy = function (candidate) {
        var len = candidate.toString().length;
        return len >= this._min && len <= this._max;
    };
    LengthBetween.prototype.toString = function () {
        return 'length between (' + this._min + ', ' + this._max + ')';
    };
    return LengthBetween;
}(Composite));
exports.LengthBetween = LengthBetween;
// Syntax sugar
function lengthBetween(min, max) {
    return new LengthBetween(min, max);
}
exports.lengthBetween = lengthBetween;
// ---------------------------------------------------------------------------
var Empty = /** @class */ (function (_super) {
    __extends(Empty, _super);
    function Empty() {
        return _super.call(this) || this;
    }
    Empty.prototype.isSatisfiedBy = function (candidate) {
        return Array.isArray(candidate)
            ? 0 === candidate.length
            : '' === candidate;
    };
    Empty.prototype.toString = function () {
        return 'is empty';
    };
    return Empty;
}(Composite));
exports.Empty = Empty;
// Syntax sugar
function empty() {
    return new Empty();
}
exports.empty = empty;
// ---------------------------------------------------------------------------
var Matches = /** @class */ (function (_super) {
    __extends(Matches, _super);
    function Matches(_regex) {
        var _this = _super.call(this) || this;
        _this._regex = _regex;
        return _this;
    }
    Matches.prototype.isSatisfiedBy = function (candidate) {
        return this._regex.test(candidate.toString());
    };
    Matches.prototype.toString = function () {
        return 'regex ' + this._regex.source;
    };
    return Matches;
}(Composite));
exports.Matches = Matches;
// Syntax sugar
function matches(regex) {
    return new Matches(regex);
}
exports.matches = matches;
// ---------------------------------------------------------------------------
var Any = /** @class */ (function (_super) {
    __extends(Any, _super);
    function Any() {
        var specs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            specs[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.specs = specs;
        return _this;
    }
    Any.prototype.isSatisfiedBy = function (candidate) {
        for (var _i = 0, _a = this.specs; _i < _a.length; _i++) {
            var currentSpec = _a[_i];
            if (currentSpec.isSatisfiedBy(candidate)) {
                return true;
            }
        }
        return 0 == this.specs.length;
    };
    Any.prototype.toString = function () {
        return '(' + this.specs.join(' or ') + ')';
    };
    return Any;
}(Composite));
exports.Any = Any;
// Syntax sugar
function any() {
    var specs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        specs[_i] = arguments[_i];
    }
    return new (Any.bind.apply(Any, __spreadArrays([void 0], specs)))();
}
exports.any = any;
// ---------------------------------------------------------------------------
var All = /** @class */ (function (_super) {
    __extends(All, _super);
    function All() {
        var specs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            specs[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.specs = specs;
        return _this;
    }
    All.prototype.isSatisfiedBy = function (candidate) {
        for (var _i = 0, _a = this.specs; _i < _a.length; _i++) {
            var currentSpec = _a[_i];
            if (!currentSpec.isSatisfiedBy(candidate)) {
                return false;
            }
        }
        return true;
    };
    All.prototype.toString = function () {
        return '(' + this.specs.join(', ') + ')';
    };
    return All;
}(Composite));
exports.All = All;
// Syntax sugar
function all() {
    var specs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        specs[_i] = arguments[_i];
    }
    return new (All.bind.apply(All, __spreadArrays([void 0], specs)))();
}
exports.all = all;
