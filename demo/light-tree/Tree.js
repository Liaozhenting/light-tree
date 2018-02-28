import React from 'react';
import classNames from 'classnames';
import _xor from "lodash/xor"
class Tree extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expandedKeys:[]
    }
  }
  
  static defaultProps = {
    prefixCls: 'light-tree',
  };
  renderTreeNode (child, index, level = 0)  {
    const { state, props } = this;
    const pos = `${level}-${index}`;
    const key = child.key || pos;
    const childProps = {
      root: this,
      pos,
      eventKey:key,
      expanded: state.expandedKeys.indexOf(key) !== -1,
    }
    return React.cloneElement(child,childProps)
  }
  onExpand(treeNode){
    const {props,state} = this;
    const expanded = !treeNode.props.expanded;
    let expandedKeys = [...state.expandedKeys];
    const eventKey = treeNode.props.eventKey;
    expandedKeys=_xor(expandedKeys, [eventKey])
    this.setState({expandedKeys})

    props.onExpand(expandedKeys, { node: treeNode, expanded });

  }
  render () {
    
    const  props  = this.props;
    let prefixCls = props.prefixCls;
    return <ul className={prefixCls}>
      {React.Children.map(props.children, this.renderTreeNode, this)}
    </ul>
  }
}

export default Tree;