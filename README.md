# light-tree

Simple React tree component

![](/show.png)
## Use in production
```
npm install --save light-tree
```

```js
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
//import the libarary
import Tree from 'light-tree'
import 'light-tree/assets/index.css'

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
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
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
  render() {
    return (
      <div className="App">
        <Tree onExpand={this.onExpand}>
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## Develop
```
npm install 
npm run build
npm start
```
view in browser at http://localhost:8082
