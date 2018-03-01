import React from 'react';
import classNames from 'classnames';
import _xor from "lodash/xor"
import {
  traverseTreeNodes
} from "./utils"
class Tree extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expandedKeys:this.calcExpandedKeys(props)
    }
  }
  
  static defaultProps = {
    prefixCls: 'light-tree',
    defaultExpandAll: false
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
  calcExpandedKeys(props,isNotInit){
    const expandedKeys  = props.expandedKeys||[];
    let expandAll = props.defaultExpandAll;
    if(!expandAll){
      return expandedKeys
    }
    const filterExpandedKeysSet = {}
    traverseTreeNodes(props.children,(item,index,pos,key)=>{
      if(expandAll){
        filterExpandedKeysSet[key] = true;
      }
    })

    const filterExpandedKeys = Object.keys(filterExpandedKeysSet);
    return filterExpandedKeys.length?filterExpandedKeys : expandedKeys
  }
  render () {
    
    const  props  = this.props;
    let prefixCls = props.prefixCls;
    return <ul className={prefixCls} >
      {React.Children.map(props.children, this.renderTreeNode, this)}
    </ul>
  }
}

export default Tree;