'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _toArray = require('rc-util/lib/Children/toArray');

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    _classCallCheck(this, TreeNode);

    var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

    _this.state = {};

    _this.onExpand = function () {
      _this.props.root.onExpand(_this);
    };

    return _this;
  }

  _createClass(TreeNode, [{
    key: 'renderSwitcher',
    value: function renderSwitcher(props, expandedState) {
      var prefixCls = props.prefixCls;
      var switcherCls = (0, _classnames2.default)(prefixCls + '-switcher', prefixCls + '-switcher_' + expandedState, _defineProperty({}, prefixCls + '-switcher-disabled', props.disabled));
      return _react2.default.createElement('span', { className: switcherCls, onClick: props.disabled ? null : this.onExpand });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(props) {
      var _childrenCls;

      var prefixCls = props.prefixCls;
      var children = null;
      if (props.children) {
        children = (0, _toArray2.default)(props.children).filter(function (item) {
          return !!item;
        });
      }

      var newChildren = children;
      var childrenCls = (_childrenCls = {}, _defineProperty(_childrenCls, prefixCls + '-child-tree ', true), _defineProperty(_childrenCls, props.prefixCls + '-child-tree-open', props.expanded), _childrenCls);
      newChildren = _react2.default.createElement(
        'ul',
        { className: (0, _classnames2.default)(childrenCls) },
        _react2.default.Children.map(children, function (item, index) {
          return props.root.renderTreeNode(item, index, props.pos);
        }, props.root)
      );
      return newChildren;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var prefixCls = props.prefixCls;
      var expandedState = props.expanded ? 'open' : 'close';
      var content = props.title;
      var newChildren = this.renderChildren(props);
      var canRenderSwitcher = !!props.children;

      var selectorHandler = function selectorHandler() {
        var title = _react2.default.createElement(
          'span',
          { className: prefixCls + '-title' },
          content
        );

        var fileTypeCls = _defineProperty({}, prefixCls + '-iconEle', true);
        if (canRenderSwitcher) {
          fileTypeCls[prefixCls + '-icon__open'] = props.expanded;
          fileTypeCls[prefixCls + '-icon__close'] = !props.expanded;
        } else {
          fileTypeCls[prefixCls + '-icon__docu'] = true;
        }
        return _react2.default.createElement(
          'span',
          { className: prefixCls + '-node-content' },
          _react2.default.createElement('span', { className: (0, _classnames2.default)(fileTypeCls) }),
          title
        );
      };
      var renderNoopSwitcher = function renderNoopSwitcher() {
        return _react2.default.createElement('span', { className: prefixCls + '-switcher ' + prefixCls + '-switcher-noop' });
      };
      return _react2.default.createElement(
        'li',
        null,
        canRenderSwitcher ? this.renderSwitcher(props, expandedState) : renderNoopSwitcher(),
        selectorHandler(),
        newChildren
      );
    }
  }]);

  return TreeNode;
}(_react2.default.Component);

TreeNode.defaultProps = {
  prefixCls: 'light-tree'
};

TreeNode.isTreeNode = 1;
exports.default = TreeNode;