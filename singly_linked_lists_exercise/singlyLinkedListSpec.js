// Changed all node.val to node.value, personal preference for the full word.
// Changed unshift to unShift for proper camel case.


var expect = chai.expect
var singlyLinkedList;
var node;

beforeEach(function(){
  singlyLinkedList = new SinglyLinkedList
  node = new Node(15)
})

describe("#singlyLinkedList", function(){
  it("contains a head that is null", function(){
    expect(singlyLinkedList.head).to.equal(null)
    expect(singlyLinkedList.tail).to.equal(null)
    expect(singlyLinkedList.hasOwnProperty('head')).to.equal(true)
    expect(singlyLinkedList.hasOwnProperty('tail')).to.equal(true)
  });
  it("contains a length property that begins at 0", function(){
    expect(singlyLinkedList.length).to.equal(0)
    expect(singlyLinkedList.hasOwnProperty('length')).to.equal(true)
  });
});

describe("#Node", function(){
  it("contains a valueue", function(){
    expect(node.value).to.equal(15)
    expect(node.hasOwnProperty('value')).to.equal(true)
    expect(node.hasOwnProperty('next')).to.equal(true)
  });
});

describe("#push", function(){
  it("inserts a node at the end of the list and increments the length of the list", function(){
    singlyLinkedList.push(5)
    expect(singlyLinkedList.length).to.equal(1)
    expect(singlyLinkedList.head.value).to.equal(5)
    singlyLinkedList.push(10)
    expect(singlyLinkedList.length).to.equal(2)
    expect(singlyLinkedList.head.next.value).to.equal(10)
    singlyLinkedList.push(15)
    expect(singlyLinkedList.length).to.equal(3)
    expect(singlyLinkedList.head.next.next.value).to.equal(15)
  });
  it("returns the singlyLinkedList so that the method can be chained", function(){
    singlyLinkedList.push(5).push(10).push(15)
    expect(singlyLinkedList.length).to.equal(3)
    expect(singlyLinkedList.head.next.next.value).to.equal(15)
  });
});

describe("#pop", function(){
  it("removes a node at the end of the list and decrements the length of the list", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.pop()).to.equal(20)
    expect(singlyLinkedList.length).to.equal(3)
    expect(singlyLinkedList.head.next.next.value).to.equal(15)
  });
  it("returns undefined if there are no nodes to remove", function(){
    expect(singlyLinkedList.pop()).to.equal(undefined)
    expect(singlyLinkedList.length).to.equal(0)
  });
});

describe("#unShift", function(){
 it("inserts a node at the beginning of the list and increments the length of the list", function(){
   singlyLinkedList.unShift(5)
   expect(singlyLinkedList.length).to.equal(1)
   expect(singlyLinkedList.head.value).to.equal(5)
   singlyLinkedList.unShift(10)
   expect(singlyLinkedList.length).to.equal(2)
   expect(singlyLinkedList.head.value).to.equal(10)
   expect(singlyLinkedList.head.next.value).to.equal(5)
   singlyLinkedList.unShift(15)
   expect(singlyLinkedList.length).to.equal(3)
   expect(singlyLinkedList.head.value).to.equal(15)
   expect(singlyLinkedList.head.next.value).to.equal(10)
   expect(singlyLinkedList.head.next.next.value).to.equal(5)
 });
 it("returns the singlyLinkedList so that the method can be chained", function(){
   singlyLinkedList.unShift(5).unShift(10).unShift(15)
   expect(singlyLinkedList.length).to.equal(3)
   expect(singlyLinkedList.head.next.next.value).to.equal(5)
 });
});

describe("#shift", function(){
  it("removes a node at the beginning of the list and decrements the length of the list", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.shift()).to.equal(5)
    expect(singlyLinkedList.length).to.equal(3)
    expect(singlyLinkedList.shift()).to.equal(10)
    expect(singlyLinkedList.length).to.equal(2)
    expect(singlyLinkedList.shift()).to.equal(15)
    expect(singlyLinkedList.length).to.equal(1)
    expect(singlyLinkedList.shift()).to.equal(20)
    expect(singlyLinkedList.length).to.equal(0)
  });
  it("returns undefined if there are no nodes to remove", function(){
    expect(singlyLinkedList.shift()).to.equal(undefined)
    expect(singlyLinkedList.length).to.equal(0)
  });
});

describe("#set", function(){
  it("finds a node and replaces its valueue or returns undefined if the node is not found", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    expect(singlyLinkedList.length).to.equal(4)
    singlyLinkedList.set(0,10)
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.head.value).to.equal(10)
    singlyLinkedList.set(10,10)
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.head.value).to.equal(10)
    singlyLinkedList.set(2,100)
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.head.next.next.value).to.equal(100)
  });
});

describe("#_get", function(){
  it("finds a node and returns its valueue ", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    expect(singlyLinkedList.get(0)).to.equal(5)
    expect(singlyLinkedList.get(1)).to.equal(10)
    expect(singlyLinkedList.get(2)).to.equal(15)
    expect(singlyLinkedList.get(3)).to.equal(20)
    expect(singlyLinkedList.get(4)).to.equal(null)
  });
});

describe("#_insert", function(){
  it("inserts a node and correct adjusts the next properties of other nodes", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    singlyLinkedList.insert(2,12)
    expect(singlyLinkedList.length).to.equal(5)
    expect(singlyLinkedList.head.value).to.equal(5)
    expect(singlyLinkedList.head.next.value).to.equal(10)
    expect(singlyLinkedList.head.next.next.value).to.equal(12)
    expect(singlyLinkedList.head.next.next.next.value).to.equal(15)
    expect(singlyLinkedList.head.next.next.next.next.value).to.equal(20)
  });
});

describe("#remove", function(){
  it("contains a root that is null", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    singlyLinkedList.remove(2)
    expect(singlyLinkedList.length).to.equal(3)
    expect(singlyLinkedList.head.value).to.equal(5)
    expect(singlyLinkedList.head.next.value).to.equal(10)
    expect(singlyLinkedList.head.next.next.value).to.equal(20)
  });
});

describe("#reverse", function(){
  it("reverses all of the nodes", function(){
    singlyLinkedList.push(5).push(10).push(15).push(20)
    singlyLinkedList.reverse()
    expect(singlyLinkedList.length).to.equal(4)
    expect(singlyLinkedList.head.value).to.equal(20)
    expect(singlyLinkedList.head.next.value).to.equal(15)
    expect(singlyLinkedList.head.next.next.value).to.equal(10)
    expect(singlyLinkedList.head.next.next.next.value).to.equal(5)
  });
});
