import React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';

class TreeNode extends React.Component {
  state = {}
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    prefixCls: 'light-tree',
  };
  
  renderSwitcher(props, expandedState) {
    const prefixCls = props.prefixCls;
    const switcherCls = classNames(
      `${prefixCls}-switcher`,
      `${prefixCls}-switcher_${expandedState}`, {
        [`${prefixCls}-switcher-disabled`]: props.disabled,
      });
    return <span className={switcherCls} onClick={props.disabled ? null : this.onExpand} />;
  }
  onExpand = () => {
    this.props.root.onExpand(this);

  }
  renderChildren(props) {
    let prefixCls = props.prefixCls;
    let children = null;
    if (props.children) {
      children = toArray(props.children).filter(item => !!item);
    }

    let newChildren = children;
    let childrenCls = {
      [`${prefixCls}-child-tree `]:true,
      [`${props.prefixCls}-child-tree-open`]: props.expanded,
    }
    newChildren = (
      <ul className={classNames(childrenCls)}>
        {
          React.Children.map(children, (item, index) => {
            return props.root.renderTreeNode(item, index, props.pos)
          }, props.root)
        }
      </ul>
    )
    return newChildren;
  }
  render() {
    const { props } = this;
    let prefixCls = props.prefixCls
    const expandedState = props.expanded ? 'open' : 'close';
    const content = props.title;
    let newChildren = this.renderChildren(props);
    let canRenderSwitcher = !!props.children;

    const selectorHandler = () => {
      const title = <span className={`${prefixCls}-title`}>{content}</span>

      let fileTypeCls = {
        [`${prefixCls}-iconEle`]:true,
      }
      if(canRenderSwitcher){
        fileTypeCls[`${prefixCls}-icon__open`]=props.expanded;
        fileTypeCls[`${prefixCls}-icon__close`]=!props.expanded;
      } else{
        fileTypeCls[`${prefixCls}-icon__docu`] = true;
      }
      return <span className={`${prefixCls}-node-content`}>
        <span className={classNames(fileTypeCls)}></span>
        {title}
      </span>
    }
    const renderNoopSwitcher = () => (
      <span className={`${prefixCls}-switcher ${prefixCls}-switcher-noop`} />
    );
    return <li>
      {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : renderNoopSwitcher()}
      {selectorHandler()}
      {newChildren}
    </li>
  }
}
TreeNode.isTreeNode = 1;
export default TreeNode;