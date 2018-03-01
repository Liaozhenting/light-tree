import { Children } from 'react';
export function traverseTreeNodes(treeNodes, cb) {
    const traverse = (subTreeNodes, level, parentChildrenPos, parentPos) => {
        if (Array.isArray(subTreeNodes)) {
            subTreeNodes = subTreeNodes.filter(item => !!item);
        }
        Children.forEach(subTreeNodes,(item,index)=>{
            const pos = `${level}-${index}`;
            parentChildrenPos.push(pos);

            const childrenPos = [];
            if(item.props.children && item.type && item.type.isTreeNode){
                traverse(item.props.children,pos,childrenPos,pos)
            }
            cb(
                item,
                index,
                pos,
                item.key||pos,
                childrenPos,
                parentPos
            )
        })
    }
    traverse(treeNodes, 0, []);
}