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
      expandedKeys:this.calcExpandedKeys(props),
      checkedKeys:[]
    }
  }
  
  static defaultProps = {
    prefixCls: 'light-tree',
    defaultExpandAll: false,
    checkable : false
  };

  onExpand(treeNode){
    const {props,state} = this;
    const expanded = !treeNode.props.expanded;
    let expandedKeys = [...state.expandedKeys];
    const eventKey = treeNode.props.eventKey;
    expandedKeys=_xor(expandedKeys, [eventKey])
    this.setState({expandedKeys})

    props.onExpand?props.onExpand(expandedKeys, { node: treeNode, expanded }):null;

  }

  onCheck(treeNode){
    const {props,state} = this;
    const checked = !treeNode.props.checked;
    const eventObj = {
      event:'check',
      node:treeNode,
      checked
    }

    let checkedKeys = [...state.checkedKeys]
    const eventKey = treeNode.props.eventKey
    checkedKeys = _xor(checkedKeys,[eventKey])
    this.setState({checkedKeys});
    props.onCheck?props.onCheck(checkedKeys,{node:treeNode,checked}):null;
    


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
  renderTreeNode (child, index, level = 0)  {
    const { state, props } = this;
    const pos = `${level}-${index}`;
    const key = child.key || pos;
    const childProps = {
      root: this,
      pos,
      eventKey:key,
      expanded: state.expandedKeys.indexOf(key) !== -1,
      checked: state.checkedKeys.indexOf(key)!==-1
    }
    if(props.checkable){
      childProps.checkable = props.checkable
    }

    return React.cloneElement(child,childProps)
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