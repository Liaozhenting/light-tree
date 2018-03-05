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

export function addClass(obj,className){
    //如果原来没有class
    if(obj.className == ""){
        obj.className = className;
    }else{
        var _index = classIndexOf(obj,className);
        //如果原来没有这个新加的class
        if(_index == -1){
            obj.className += " " + className;
        }
    }
}

export function removeClass(obj,className){
    //如果以前的元素不为空
    if(obj.className != ""){
        var arrClassName = obj.className.split(" ");
        var _index = classIndexOf(obj,className);
        //如果存在要删除的class
        if(_index != -1){
            arrClassName.splice(_index,1);
        }
        obj.className = arrClassName.join(" ");
    }
}