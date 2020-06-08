"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var MouseChaseIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(MouseChaseIcon, _Component);

  function MouseChaseIcon() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MouseChaseIcon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MouseChaseIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "icon", _react["default"].createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      lFollowX: 0,
      lFollowY: 0,
      x: 0,
      y: 0,
      over: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this._isMounted = true;

      var node = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var x, y, lFollowX, lFollowY;
      x = lFollowX = node.clientWidth / 2;
      y = lFollowY = node.clientHeight / 2 + node.offsetTop;

      _this.setState({
        x: x,
        y: y,
        lFollowX: lFollowX,
        lFollowY: lFollowY
      });

      window.addEventListener("mousemove", _this.handleMouse);
      node.addEventListener("mouseenter", _this.handleMouseEnter);
      node.addEventListener("mouseleave", _this.handleMouseLeave);
      _this.node = node;

      _this.handleMouse();

      _this.moveIcon();
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      window.cancelAnimationFrame(_this.moveIcon);
      window.removeEventListener("mousemove", _this.handleMouse);

      _this.node.removeEventListener("mouseenter", _this.handleMouseEnter);

      _this.node.removeEventListener("mouseleave", _this.handleMouseLeave);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouse", function (e) {
      var lMouseX, lMouseY;
      var lFollowX, lFollowY;

      var offset = _this.node.getBoundingClientRect();

      var over = _this.state.over;
      var disabled = _this.props.disabled;

      if (!over || disabled) {
        lMouseX = _this.node.clientWidth / 2;
        lMouseY = _this.node.clientHeight / 2;
      } else {
        lMouseX = e.pageX - offset.left;
        lMouseY = e.clientY - offset.top;
      }

      lFollowX = lMouseX - _this.icon.current.clientWidth / 2;
      lFollowY = lMouseY - _this.icon.current.clientHeight / 2;

      _this.setState({
        lFollowX: lFollowX,
        lFollowY: lFollowY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "moveIcon", function () {
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

        window.requestAnimationFrame(_this.moveIcon);
      }
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

      setTimeout(_this.handleMouse, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          className = _this$props.className,
          icon = _this$props.icon,
          children = _this$props.children,
          onClick = _this$props.onClick;
      var _this$state2 = _this.state,
          x = _this$state2.x,
          y = _this$state2.y,
          over = _this$state2.over;
      var style = {
        position: 'absolute',
        top: '0',
        left: '0',
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        cursor: 'pointer'
      };
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])("mousechase-wrapper mousechase-icon", _defineProperty({}, className, className !== undefined)),
        style: {
          position: 'relative',
          overflow: 'hidden'
        }
      }, children, _react["default"].createElement("div", {
        onClick: onClick,
        style: style,
        ref: _this.icon,
        className: (0, _classnames["default"])('mousechase-icon__icon', {
          'mousechase-icon__icon--active': over
        })
      }, icon));
    });

    return _this;
  }

  return MouseChaseIcon;
}(_react.Component);

MouseChaseIcon.propTypes = {
  disabled: _propTypes["default"].bool,
  friction: _propTypes["default"].number.isRequired,
  icon: _propTypes["default"].node.isRequired,
  onClick: _propTypes["default"].func.isRequired
};
MouseChaseIcon.defaultProps = {
  disabled: false,
  friction: 0.1
};
var _default = MouseChaseIcon;
exports["default"] = _default;