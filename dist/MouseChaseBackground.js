"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MouseChaseBackground =
/*#__PURE__*/
function (_Component) {
  _inherits(MouseChaseBackground, _Component);

  function MouseChaseBackground() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MouseChaseBackground);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MouseChaseBackground)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      lFollowX: 0,
      lFollowY: 0,
      x: 0,
      y: 0,
      over: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this._isMounted = true;

      var node = _reactDom["default"].findDOMNode(_assertThisInitialized(_this)).parentNode;

      window.addEventListener("mousemove", _this.handleMouse);
      node.addEventListener('mouseleave', _this.handleMouseLeave);
      node.addEventListener('mouseenter', _this.handleMouseEnter);
      _this.node = node;

      _this.moveBackground();
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      _this._isMounted = false;
      window.cancelAnimationFrame(_this.moveBackground);

      _this.node.removeEventListener('mouseleave', _this.handleMouseLeave);

      _this.node.removeEventListener('mouseenter', _this.handleMouseEnter);
    });

    _defineProperty(_assertThisInitialized(_this), "moveBackground", function () {
      var _this$state = _this.state,
          x = _this$state.x,
          y = _this$state.y,
          lFollowX = _this$state.lFollowX,
          lFollowY = _this$state.lFollowY;
      var friction = _this.props.friction;
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;

      if (_this._isMounted) {
        _this.setState({
          x: x,
          y: y
        });

        window.requestAnimationFrame(_this.moveBackground);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouse", function (e) {
      var lMouseX, lMouseY;
      var lFollowX, lFollowY;
      var over = _this.state.over;
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          disabledOnMouseout = _this$props.disabledOnMouseout;

      if (disabled || !over && disabledOnMouseout) {
        lMouseX = 0;
        lMouseY = 0;
      } else {
        lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
        lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
      }

      lFollowX = 20 * lMouseX / 100;
      lFollowY = 10 * lMouseY / 100;

      _this.setState({
        lFollowX: lFollowX,
        lFollowY: lFollowY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (e) {
      _this.setState({
        over: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (e) {
      _this.setState({
        over: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          invert = _this$props2.invert;
      var _this$state2 = _this.state,
          x = _this$state2.x,
          y = _this$state2.y,
          over = _this$state2.over;
      var bgStyle = {
        transform: 'translate(' + x * (invert ? 1 : -1) + 'px, ' + y * (invert ? 1 : -1) + 'px) scale(1.2)'
      };
      var addProps = {
        style: bgStyle
      };

      var childrenWithProps = _react["default"].Children.map(children, function (child) {
        return _react["default"].cloneElement(child, addProps);
      });

      return _react["default"].createElement("div", {
        className: "mousechase-wrapper mousechase-background"
      }, childrenWithProps);
    });

    return _this;
  }

  return MouseChaseBackground;
}(_react.Component);

MouseChaseBackground.propTypes = {
  disabled: _propTypes["default"].bool,
  disabledOnMouseout: _propTypes["default"].bool,
  friction: _propTypes["default"].number.isRequired,
  invert: _propTypes["default"].bool
};
MouseChaseBackground.defaultProps = {
  disabled: false,
  disabledOnMouseout: true,
  invert: true,
  friction: 0.05
};
var _default = MouseChaseBackground;
exports["default"] = _default;