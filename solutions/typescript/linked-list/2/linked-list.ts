class LinkedNode<Type>{
  private _next?: LinkedNode<Type>;
  private _prev?: LinkedNode<Type>;
  private _item: Type;
  constructor(item:Type){
    this._item = item;
  }
  get item() {
    return this._item;
  }
  get next(): LinkedNode<Type>|undefined {
    return this._next
  }
  get prev(): LinkedNode<Type>|undefined {
    return this._prev
  }
  set next(next: LinkedNode<Type>|undefined){
    this._next = next
  }
  set prev(prev: LinkedNode<Type>|undefined){
    this._prev = prev
  }
  append(node: LinkedNode<Type>|undefined){
    this.next = node;
    if(node) node.prev = this;
  }
  prepend(node: LinkedNode<Type>| undefined){
    this.prev = node;
    if(node) node.next = this;
  }  
  unlinkFromPrevious(){
    if(this.prev) this.prev.next = undefined;
    this.prev = undefined
  }
  unlinkFromNext(){
    if(this.next) this.next.prev = undefined;
    this.next = undefined
  }
  unlink(){
    this.unlinkFromPrevious()
    this.unlinkFromNext()
  }    
}

export class LinkedList<Type> {
  
  private _firstNode: LinkedNode<Type>|undefined;

  private _lastNode(): LinkedNode<Type>|undefined{
    let currentNode = this._firstNode;
    while(currentNode && currentNode.next){
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  push(item: Type): void {
    const newNode = new LinkedNode(item);       
    const lastNode = this._lastNode();   
    if (!lastNode) {
      this._firstNode = newNode;
    } else {
      lastNode.append(newNode);
    }
  }
  
  pop(): Type|undefined {
    const lastNode = this._lastNode();
    if(lastNode === this._firstNode){
      this._firstNode = undefined;
    }
    lastNode?.unlink()
    return lastNode?.item;
  }

  shift(): Type|undefined {
    let firstNodeItem = this._firstNode?.item; 
    const nextNode = this._firstNode?.next;
    if(nextNode){
      nextNode.unlinkFromPrevious();
      this._firstNode = nextNode;
    } else {
      this._firstNode = undefined
    }    
    return firstNodeItem
  }

  unshift(item:Type): void {
    const newNode = new LinkedNode(item);     
    this._firstNode?.prepend(newNode);
    this._firstNode = newNode;
  }

  count(): Number {
    let currentNode = this._firstNode;
    let count = currentNode ? 1 : 0;
    while(currentNode && currentNode.next){
      currentNode = currentNode.next;
      count+=1;
    }
    return count;
  }

  delete(item:Type): void {
    let currentNode = this._firstNode;
    while(currentNode){
      if(currentNode.item === item){
        const previous = currentNode.prev;
        const next = currentNode.next;
        currentNode.unlink()
        previous?.append(next);
        
        if(currentNode === this._firstNode){
          this._firstNode = undefined
        }
      }
      currentNode = currentNode.next;
    }    
  }
}