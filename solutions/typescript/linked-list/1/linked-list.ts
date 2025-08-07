interface INode<Type> {
  next?: INode<Type>;
  prev?: INode<Type>;
  item: Type;  
}
export class LinkedList<Type> {
  private _firstNode: INode<Type>|undefined;
  private _last():INode<Type>|undefined{
    let currentNode = this._firstNode;
    while(currentNode && currentNode.next){
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  push(item: Type): void {
    const newNode = {
      item: item
    };   
    const lastNode = this._last();   
    if (!lastNode) {
      this._firstNode = newNode;
    } else {
      const newNode = {
        prev: lastNode,
        item: item
      };    
      lastNode.next = newNode;  
    }
  }
  
  pop():Type|undefined {
    const lastNode = this._last();
    if(lastNode && lastNode.prev){
      lastNode.prev.next = undefined;
    }
    if(lastNode===this._firstNode){
      this._firstNode=undefined;
    }
    const lastNodeValue = lastNode?.item;
    return lastNodeValue;
  }

  shift():Type|undefined{
    let firstNodeItem;
    if (this._firstNode){
      firstNodeItem = this._firstNode.item;
      const secondNode = this._firstNode?.next;
      if(secondNode){
        secondNode.prev = undefined;
        this._firstNode = secondNode;
      } else {
        this._firstNode = undefined
      }
    }
    return firstNodeItem
  }

  unshift(item:Type):void{
    const newNode:INode<Type> = {
      item: item
    }
    if(this._firstNode){
      this._firstNode.prev = newNode;
      newNode.next = this._firstNode;
    }
    this._firstNode = newNode;
  }

  count(): Number{
    let currentNode = this._firstNode;
    let count = currentNode ? 1 : 0;
    while(currentNode && currentNode.next){
      currentNode = currentNode.next;
      count+=1;
    }
    return count;
  }

  delete(item:Type):void{
    let currentNode = this._firstNode;
    while(currentNode){
      if(currentNode.item === item){
        if(currentNode?.prev){
          currentNode.prev.next = currentNode.next
        }
        if(currentNode?.next){
          currentNode.next.prev = currentNode.prev
        }
        if(currentNode === this._firstNode){
          this._firstNode = undefined
        }
      }
      currentNode = currentNode.next;
    }
    
  }
}