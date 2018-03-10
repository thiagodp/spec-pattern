"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Composite_ = /** @class */ (function () {
    function Composite_() {
    }
    Composite_.prototype.and = function (other) {
        return new And_(this, other);
    };
    Composite_.prototype.andNot = function (other) {
        return new AndNot_(this, other);
    };
    Composite_.prototype.or = function (other) {
        return new Or_(this, other);
    };
    Composite_.prototype.orNot = function (other) {
        return new OrNot_(this, other);
    };
    Composite_.prototype.not = function () {
        return new Not_(this);
    };
    return Composite_;
}());
exports.Composite_ = Composite_;
var And_ = /** @class */ (function (_super) {
    __extends(And_, _super);
    function And_(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    And_.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) && this._right.isSatisfiedBy(candidate);
    };
    And_.prototype.toString = function () {
        return '(' + this._left.toString() + ' and ' + this._right.toString() + ')';
    };
    return And_;
}(Composite_));
exports.And_ = And_;
var AndNot_ = /** @class */ (function (_super) {
    __extends(AndNot_, _super);
    function AndNot_(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    AndNot_.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) && !this._right.isSatisfiedBy(candidate);
    };
    AndNot_.prototype.toString = function () {
        return '(' + this._left.toString() + ' and not ' + this._right.toString() + ')';
    };
    return AndNot_;
}(Composite_));
exports.AndNot_ = AndNot_;
var Or_ = /** @class */ (function (_super) {
    __extends(Or_, _super);
    function Or_(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    Or_.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) || this._right.isSatisfiedBy(candidate);
    };
    Or_.prototype.toString = function () {
        return '(' + this._left.toString() + ' or ' + this._right.toString() + ')';
    };
    return Or_;
}(Composite_));
exports.Or_ = Or_;
var OrNot_ = /** @class */ (function (_super) {
    __extends(OrNot_, _super);
    function OrNot_(_left, _right) {
        var _this = _super.call(this) || this;
        _this._left = _left;
        _this._right = _right;
        return _this;
    }
    OrNot_.prototype.isSatisfiedBy = function (candidate) {
        return this._left.isSatisfiedBy(candidate) || !this._right.isSatisfiedBy(candidate);
    };
    OrNot_.prototype.toString = function () {
        return '(' + this._left.toString() + ' or not ' + this._right.toString() + ')';
    };
    return OrNot_;
}(Composite_));
exports.OrNot_ = OrNot_;
var Not_ = /** @class */ (function (_super) {
    __extends(Not_, _super);
    function Not_(_other) {
        var _this = _super.call(this) || this;
        _this._other = _other;
        return _this;
    }
    Not_.prototype.isSatisfiedBy = function (candidate) {
        return !this._other.isSatisfiedBy(candidate);
    };
    Not_.prototype.toString = function () {
        return '(not ' + this._other.toString() + ')';
    };
    return Not_;
}(Composite_));
exports.Not_ = Not_;
var EqualTo_ = /** @class */ (function (_super) {
    __extends(EqualTo_, _super);
    function EqualTo_(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    EqualTo_.prototype.isSatisfiedBy = function (candidate) {
        return this._value == candidate;
    };
    EqualTo_.prototype.toString = function () {
        return 'equal to ' + this._value;
    };
    return EqualTo_;
}(Composite_));
exports.EqualTo_ = EqualTo_;
var GreaterThan_ = /** @class */ (function (_super) {
    __extends(GreaterThan_, _super);
    function GreaterThan_(_min) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        return _this;
    }
    GreaterThan_.prototype.isSatisfiedBy = function (candidate) {
        return candidate > this._min;
    };
    GreaterThan_.prototype.toString = function () {
        return 'greater than ' + this._min;
    };
    return GreaterThan_;
}(Composite_));
exports.GreaterThan_ = GreaterThan_;
var GreaterThanOrEqualTo_ = /** @class */ (function (_super) {
    __extends(GreaterThanOrEqualTo_, _super);
    function GreaterThanOrEqualTo_(_min) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        return _this;
    }
    GreaterThanOrEqualTo_.prototype.isSatisfiedBy = function (candidate) {
        return candidate >= this._min;
    };
    GreaterThanOrEqualTo_.prototype.toString = function () {
        return 'greater than or equal to ' + this._min;
    };
    return GreaterThanOrEqualTo_;
}(Composite_));
exports.GreaterThanOrEqualTo_ = GreaterThanOrEqualTo_;
var LessThan_ = /** @class */ (function (_super) {
    __extends(LessThan_, _super);
    function LessThan_(_max) {
        var _this = _super.call(this) || this;
        _this._max = _max;
        return _this;
    }
    LessThan_.prototype.isSatisfiedBy = function (candidate) {
        return candidate < this._max;
    };
    LessThan_.prototype.toString = function () {
        return 'less than ' + this._max;
    };
    return LessThan_;
}(Composite_));
exports.LessThan_ = LessThan_;
var LessThanOrEqualTo_ = /** @class */ (function (_super) {
    __extends(LessThanOrEqualTo_, _super);
    function LessThanOrEqualTo_(_max) {
        var _this = _super.call(this) || this;
        _this._max = _max;
        return _this;
    }
    LessThanOrEqualTo_.prototype.isSatisfiedBy = function (candidate) {
        return candidate <= this._max;
    };
    LessThanOrEqualTo_.prototype.toString = function () {
        return 'less than or equal to ' + this._max;
    };
    return LessThanOrEqualTo_;
}(Composite_));
exports.LessThanOrEqualTo_ = LessThanOrEqualTo_;
var StartsWith_ = /** @class */ (function (_super) {
    __extends(StartsWith_, _super);
    function StartsWith_(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    StartsWith_.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return 0 === c.indexOf(v);
    };
    StartsWith_.prototype.toString = function () {
        return 'starts with ' + this._value;
    };
    return StartsWith_;
}(Composite_));
exports.StartsWith_ = StartsWith_;
var EndsWith_ = /** @class */ (function (_super) {
    __extends(EndsWith_, _super);
    function EndsWith_(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    EndsWith_.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.substr(c.length - v.length, v.length) === v;
    };
    EndsWith_.prototype.toString = function () {
        return 'ends with ' + this._value;
    };
    return EndsWith_;
}(Composite_));
exports.EndsWith_ = EndsWith_;
var Contains_ = /** @class */ (function (_super) {
    __extends(Contains_, _super);
    function Contains_(_value, _ignoreCase) {
        if (_ignoreCase === void 0) { _ignoreCase = false; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._ignoreCase = _ignoreCase;
        return _this;
    }
    Contains_.prototype.isSatisfiedBy = function (candidate) {
        var c = this._ignoreCase ? candidate.toString().toLowerCase() : candidate.toString();
        var v = this._ignoreCase ? this._value.toString().toLowerCase() : this._value.toString();
        return c.indexOf(v) !== -1;
    };
    Contains_.prototype.toString = function () {
        return 'contains ' + this._value;
    };
    return Contains_;
}(Composite_));
exports.Contains_ = Contains_;
var In_ = /** @class */ (function (_super) {
    __extends(In_, _super);
    function In_(_values) {
        var _this = _super.call(this) || this;
        _this._values = _values;
        return _this;
    }
    In_.prototype.isSatisfiedBy = function (candidate) {
        return this._values.indexOf(candidate) >= 0;
    };
    In_.prototype.toString = function () {
        return 'in [' + this._values.join(', ') + ']';
    };
    return In_;
}(Composite_));
exports.In_ = In_;
var Between_ = /** @class */ (function (_super) {
    __extends(Between_, _super);
    function Between_(_min, _max) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        _this._max = _max;
        return _this;
    }
    Between_.prototype.isSatisfiedBy = function (candidate) {
        return candidate >= this._min && candidate <= this._max;
    };
    Between_.prototype.toString = function () {
        return 'between (' + this._min + ', ' + this._max + ')';
    };
    return Between_;
}(Composite_));
exports.Between_ = Between_;
var LengthBetween_ = /** @class */ (function (_super) {
    __extends(LengthBetween_, _super);
    function LengthBetween_(_min, _max) {
        var _this = _super.call(this) || this;
        _this._min = _min;
        _this._max = _max;
        return _this;
    }
    LengthBetween_.prototype.isSatisfiedBy = function (candidate) {
        var len = candidate.toString().length;
        return len >= this._min && len <= this._max;
    };
    LengthBetween_.prototype.toString = function () {
        return 'length between (' + this._min + ', ' + this._max + ')';
    };
    return LengthBetween_;
}(Composite_));
exports.LengthBetween_ = LengthBetween_;
//# sourceMappingURL=index.js.map