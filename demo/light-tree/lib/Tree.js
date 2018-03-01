'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _xor2 = require('lodash/xor');

var _xor3 = _interopRequireDefault(_xor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree(props) {
    _classCallCheck(this, Tree);

    var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

    _this.state = {
      expandedKeys: []
    };
    return _this;
  }

  _createClass(Tree, [{
    key: 'renderTreeNode',
    value: function renderTreeNode(child, index) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var state = this.state,
          props = this.props;

      var pos = level + '-' + index;
      var key = child.key || pos;
      var childProps = {
        root: this,
        pos: pos,
        eventKey: key,
        expanded: state.expandedKeys.indexOf(key) !== -1
      };
      return _react2.default.cloneElement(child, childProps);
    }
  }, {
    key: 'onExpand',
    value: function onExpand(treeNode) {
      var props = this.props,
          state = this.state;

      var expanded = !treeNode.props.expanded;
      var expandedKeys = [].concat(_toConsumableArray(state.expandedKeys));
      var eventKey = treeNode.props.eventKey;
      expandedKeys = (0, _xor3.default)(expandedKeys, [eventKey]);
      this.setState({ expandedKeys: expandedKeys });

      props.onExpand(expandedKeys, { node: treeNode, expanded: expanded });
    }
  }, {
    key: 'render',
    value: function render() {

      var props = this.props;
      var prefixCls = props.prefixCls;
      return _react2.default.createElement(
        'ul',
        { className: prefixCls },
        _react2.default.Children.map(props.children, this.renderTreeNode, this)
      );
    }
  }]);

  return Tree;
}(_react2.default.Component);

Tree.defaultProps = {
  prefixCls: 'light-tree'
};
exports.default = Tree;