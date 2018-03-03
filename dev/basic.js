import React from 'react';
import ReactDOM from 'react-dom';
//import the libarary
import Tree from '../src/index'
import '../assets/index.less'

const { TreeNode } = Tree;
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0', key: '0-1-0' },
    { title: '0-1-1', key: '0-1-1' },
    { title: '0-1-2', key: '0-1-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];

class App extends React.Component {

  renderTreeNodes=(data)=> {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  onExpand(expandKey) {
    console.log('onExpand', expandKey)
  }
  onCheck(checkedKey){
    console.log('onCheck',checkedKey)
  }
  render() {
    return (
      <div className="App">
        <Tree onExpand={this.onExpand} 
        onCheck={this.onCheck}
        defaultExpandAll
        checkable
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));