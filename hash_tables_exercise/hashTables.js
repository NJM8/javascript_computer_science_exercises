function HashTable(size=5){  // needed to increase initial array size to prevent collisions that we shouldn't have to deal with in first set of exercises. Then you need a smaller number like to test the seperate chaining functions as the tests won't produce collisions. 
    this.keyMap = new Array(size);
}

HashTable.prototype.RANDOM_VAL = 18539;

HashTable.prototype._hash = function(key) {
  var hashFunction = function(numericKey, multiple, size) {
    return (numericKey * multiple) % size;
  }

  if (Number.isFinite(key)) {
    return hashFunction(key, this.RANDOM_VAL, this.keyMap.length); // why not hashFunction(key, this.RANDOM_VAL, this.keyMap.length); ??
  }

  if (typeof key === 'string' && !isNaN(Number(key))) {
    return hashFunction(Number(key), this.RANDOM_VAL, this.keyMap.length);
  }
  
  var tempKey = key; 
  if (key === null) {
    tempKey = "null";
  }

  if (key === undefined) {
    tempKey = "undefined";
  }

  if (isNaN(key) || !isFinite(key)) {
    tempKey = "NaN";
  }

  if (typeof tempKey === 'string') {
    var numKey = 0;
    for (var i = 0; i < tempKey.length && i < 5; i++) {
      numKey += tempKey.charCodeAt(i);
    }

    return hashFunction(numKey, this.RANDOM_VAL, this.keyMap.length)
  }
}


// set - This function should set a value in the hashTable based on a specified key.

HashTable.prototype.set = function(key, value){
  let index = this._hash(key);

  if (this.keyMap[index] === undefined) {
    let record = new SinglyLinkedList();
    record.pushToList(key, value);
    this.keyMap[index] = record;
  } else {
    let record = this.keyMap[index];
    record.pushToList(key, value);
  }
}

// get - This function returns a value in the hashTable based on a specified key.

HashTable.prototype.get = function(key){
  let index = this._hash(key);
  let record = this.keyMap[index];

  if (record === undefined) {
    return undefined;
  } 

  if (record.head.key === key) {
    return record.head.value;
  }

  if (record.length > 1) {
    return record.findInList(key);
  } 

  if (record.length === 1 && record.head.key !== key) {
    while (record) {
      index++;
      record = this.keyMap[index];
      if (record.head.key === key) {
        return record.head.value;
      }
      if (record === undefined) {
        return undefined;
      }
    }
  }
}


// containsKey - This function should return true if the key specified exists in the hash table

HashTable.prototype.containsKey = function(key){
  let index = this._hash(key);
  let record = this.keyMap[index];

  if (record === undefined) {
    return false;
  } 

  if (record.length === 1 && record.head.key !== key) {
    while (record) {
      if (record.head.key === key) {
        return true;
      }
      if (record === undefined) {
        return false;
      }
      index++;
      record = this.keyMap[index];
    }
  } 

  if (record.head.key === key) {
    return true;
  } else {
    let node = record.head;
    while (node) {
      if (node.key === key) {
        return true;
      } 
      if (node.key === null) {
        return false;
      }
      node = node.next;
    } 
  }
}

// remove - This function should remove a value from the hash table

HashTable.prototype.remove = function(key) {
  let thisKey = this.get(key);

  if (thisKey === undefined) {
    return thisKey;
  } 

  let index = this._hash(key);

  delete this.keyMap[index];
}

// keys - This function should return all of the keys in the hash table

HashTable.prototype.keys = function(){
  let keysArray = [];

  for (let i = 0; i < this.keyMap.length; i++) {
    let record = this.keyMap[i];
    if (record) {
      let node = record.head;

      while (node) {
        keysArray.push(node.key);
        node = node.next;
      }
    } 
  }
  return keysArray;
}

// values - This function should return all of the values

HashTable.prototype.values = function(){
  let valuesArray = [];

  for (let i = 0; i < this.keyMap.length; i++) {
    let record = this.keyMap[i];
    if (record) {
      let node = record.head;

      while (node) {
        valuesArray.push(node.value);
        node = node.next;
      }
    } 
  }
  return valuesArray;
}

// setSeparateChaining - This function should set a value in the hashTable based on a specified key. It should handle collisions using separate chaining.

HashTable.prototype.setSeparateChaining = function(key, value){
  let index = this._hash(key);
  let record = this.keyMap[index];

  if (record === undefined) {
    this.set(key, value);
  } else {
    record.pushToList(key, value);
  }
}

// getSeparateChaining - This function return a value in the hashTable based on a specified key. It should handle collisions using separate chaining.

HashTable.prototype.getSeparateChaining = function(key){
    let index = this._hash(key);
    let record = this.keyMap[index];

    if (record) {
      let node = record.head;
      while (node) {
        if (node.key === key) {
          return node.value;
        } 
        node = node.next;
      }
    }
}

// setLinearProbing - This function should set a value in the hashTable based on a specified key. It should handle collisions using linear probing.

HashTable.prototype.setLinearProbing = function(key, value){
  let index = this._hash(key);
  let record = this.keyMap[index];

  if (record !== undefined) {
    while (record !== undefined) {
      if (index < this.keyMap.length) {
        index += 1;
      } else if (index === this.keyMap.length) {
        index = 0;
      }

      record = this.keyMap[index];

      if (record === undefined) {
        let newRecord = new SinglyLinkedList();
        newRecord.pushToList(key, value);
        this.keyMap[index] = newRecord;
        return;
      }
    }
  } else {
    this.set(key, value);
  }
}

// getLinearProbing - This function return a value in the hashTable based on a specified key. It should handle collisions using linear probing.

HashTable.prototype.getLinearProbing = function(key){
  let index = this._hash(key);
  let record = this.keyMap[index];

  while (record) {
    let head = record.head;
    if (head.key === key) {
      return head.value;
    } else {
      index++;
      record = this.keyMap[index];
    }
  }
}


// below is code for singly linked list functionality

function Node(key, value){
  this.key = key;
  this.value = value;
  this.next = null;
}

function SinglyLinkedList(){
  this.head = null;
  this.tail = null;
  this.length = 0;
}

SinglyLinkedList.prototype.pushToList = function(key, value){
  let node = new Node(key, value);

  if (!this.head && !this.tail){
    this.head = node;
    this.tail = this.head;
  } else {
    this.tail.next = node;
    this.tail = this.tail.next;
  }

  this.length++;

  return this;
}

SinglyLinkedList.prototype.findInList = function(key){
  let element = this.head;
  let next = this.head.next;

  while (element){
    if (element.key === key){
      return element.value;
    } else {
      if (next === null){
        return undefined;
      }
      element = next;
      next = element.next;
    }
  } 
}

// Lots to be updated and optimized here. Should use findInList in all functions that require searching and have it pass back the found node. Then do whatever with it.  







