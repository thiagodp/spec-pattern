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
Object.defineProperty(exports, "__esModule", { value: true });
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
