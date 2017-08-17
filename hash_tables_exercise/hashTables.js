function HashTable(size=50){  // needed to increase initial array size to prevent collisions that we shouldn't have to deal with in first set of exercises.
    this.keyMap = new Array(size);
}
HashTable.prototype.RANDOM_VAL = 18539;

HashTable.prototype._hash = function(key) {
  var hashFunction = function(numericKey, multiple, size) {
    //console.log((numericKey * multiple) % size);
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
  let record = new Object;

  record.key = key;
  record.value = value;

  //console.log(key);
  //console.log(value);

  let index = this._hash(key);
  //console.log(index);
  this.keyMap[index] = record;
}

// get - This function return a value in the hashTable based on a specified key.

HashTable.prototype.get = function(key){
  let index = this._hash(key);
  let record = this.keyMap[index];

  if (record === undefined) {
    return 'no data with that key';
  } else {
    return record.value;
  }
}

// containsKey - This function should return true if the key specified exists in the hash table

HashTable.prototype.containsKey = function(key){
  let hasKey = this.get(key);

  if (hasKey === 'no data with that key' || hasKey === undefined) {
    return false;
  } else {
    return true;
  }
}

// remove - This function should remove a value from the hash table

HashTable.prototype.remove = function(key) {
  let thisKey = this.get(key);

  if (thisKey === 'no data with that key') {
    return thisKey;
  } 

  let index = this._hash(key);

  this.keyMap[index] = '';
}

// keys - This function should return all of the keys in the hash table

HashTable.prototype.keys = function(){
  let keysArray = [];

  // this.keyMap.forEach(function(element){
  //   if (element.key) {
  //     keysArray.push(element.key);
  //   }
  // })

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      keysArray.push(this.keyMap[i].key);
    } 
  }

  return keysArray;
}

// values - This function should return all of the values

HashTable.prototype.values = function(){
  let valuesArray = [];

  this.keyMap.forEach(function(element){
    if (element.value) {
      valuesArray.push(element.value);
    }
  })

  return valuesArray;
}

// setSeparateChaining - This function should set a value in the hashTable based on a specified key. It should handle collisions using separate chaining.

// getSeparateChaining - This function return a value in the hashTable based on a specified key. It should handle collisions using separate chaining.

// setLinearProbing - This function should set a value in the hashTable based on a specified key. It should handle collisions using linear probing.

// getLinearProbing - This function return a value in the hashTable based on a specified key. It should handle collisions using linear probing.

// let myHashTable = new HashTable();
// myHashTable.set(31, 'Nate');
// myHashTable.set(1, 'Ella');
// myHashTable.set(38, 'Liz');
// myHashTable.set(4, 'kai');
// //myHashTable.set('123', 'awesome');
// //myHashTable.set('foo', 'bar');
// //myHashTable.set('done!', 'nice!');
// console.log(myHashTable);

// console.log(myHashTable.keys());

// figure out why hash table is in opposite order









