class Node {
  constructor(data) {
      this.data = data;
      this.color = "RED";
      this.left = null;
      this.right = null;
      this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
      this.root = null;
      this.size = 0;
  }

  rotateL(x) {
      let y = x.right;
      x.right = y.left;
      if (y.left !== null) y.left.parent = x;
      y.parent = x.parent;
      if (x.parent === null) this.root = y;
      else if (x === x.parent.left) x.parent.left = y;
      else x.parent.right = y;
      y.left = x;
      x.parent = y;
  }

  rotateR(x) {
      let y = x.left;
      x.left = y.right;
      if (y.right !== null) y.right.parent = x;
      y.parent = x.parent;
      if (x.parent === null) this.root = y;
      else if (x === x.parent.right) x.parent.right = y;
      else x.parent.left = y;
      y.right = x;
      x.parent = y;
  }

  fix(z) {
      while (z.parent !== null && z.parent.color === "RED") {
          let g = z.parent.parent;
          if (z.parent === g.left) {
              let u = g.right;
              if (u !== null && u.color === "RED") {
                  z.parent.color = "BLACK";
                  u.color = "BLACK";
                  g.color = "RED";
                  z = g;
              } else {
                  if (z === z.parent.right) {
                      z = z.parent;
                      this.rotateL(z);
                  }
                  z.parent.color = "BLACK";
                  g.color = "RED";
                  this.rotateR(g);
              }
          } else {
              let u = g.left;
              if (u !== null && u.color === "RED") {
                  z.parent.color = "BLACK";
                  u.color = "BLACK";
                  g.color = "RED";
                  z = g;
              } else {
                  if (z === z.parent.left) {
                      z = z.parent;
                      this.rotateR(z);
                  }
                  z.parent.color = "BLACK";
                  g.color = "RED";
                  this.rotateL(g);
              }
          }
      }
      this.root.color = "BLACK";
  }

  insert(data) {
      // Check if the data already exists
      if (this.contains(data)) {
          console.log(`Value ${data} already exists in the tree.`);
          return; // Stop insertion if duplicate
      }

      let z = new Node(data);
      let y = null;
      let x = this.root;

      while (x !== null) {
          y = x;
          if (z.data < x.data) x = x.left;
          else x = x.right;
      }

      z.parent = y;
      if (y === null) this.root = z;
      else if (z.data < y.data) y.left = z;
      else y.right = z;

      z.color = "RED";
      this.fix(z);
      this.size++;
  }

  contains(data) {
      let current = this.root;
      while (current !== null) {
          if (data === current.data) return true; // Found duplicate
          current = data < current.data ? current.left : current.right;
      }
      return false; // Not found
  }

  inorder(node, res) {
      if (node !== null) {
          this.inorder(node.left, res);
          res.push(node.data + " (" + node.color + ")");
          this.inorder(node.right, res);
      }
  }

  display() {
      let res = [];
      this.inorder(this.root, res);
      return res.join(" ");
  }

  toJSON(node = this.root) {
      if (node === null) {
          return null;
      }

      const jsonNode = {
          value: node.data,
          children: [],
          color: node.color
      };

      if (node.left || node.right) {
          if (node.left) {
              jsonNode.children.push(this.toJSON(node.left));
          } else {
              jsonNode.children.push({ value: "Empty", children: [], color: "NONE" });
          }

          if (node.right) {
              jsonNode.children.push(this.toJSON(node.right));
          } else {
              jsonNode.children.push({ value: "Empty", children: [], color: "NONE" });
          }
      }

      return jsonNode;
  }

  removeTree() {
      var graph = document.querySelector("svg");
      if (graph) {
          graph.parentElement.removeChild(graph);
      }
  }
  clear()
  {
    this.root = null;
    this.size = 0;
  }
//   newJson(jsonNode)
//   {
//     this.clear();
//     this.insertFromJSON(jsonNode);
//     console.log(JSON.stringify(this.toJSON(),null,2));
//     drawTree(this.toJSON(),this.size,this);
//   }
//   insertFromJSON(jsonNode) {

//     if (jsonNode === null) {
//         return; // Base case: if the node is null, do nothing
//     }

//     // Insert the value of the current node
//     this.insert(jsonNode.value);
//     console.log(jsonNode.value);

//     // Recursively insert children
//     for (const child of jsonNode.children) {
//         if(child.value != "Empty"){
//         this.insertFromJSON(child); // Insert each child node
//         }
//     }
    
// }
remove(data) {
  let z = this.findNode(data);
  if (!z) {
      console.log(`Value ${data} does not exist in the tree.`);
      return;
  }

  let y = z;
  let x;
  let yOriginalColor = y.color;

  if (z.left === null) {
      x = z.right;
      this.transplant(z, z.right);
  } else if (z.right === null) {
      x = z.left;
      this.transplant(z, z.left);
  } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
          if (x) x.parent = y;
      } else {
          this.transplant(y, y.right);
          y.right = z.right;
          y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
  }

  if (yOriginalColor === "BLACK") {
      this.fixRemove(x, y.parent);
  }
  
  this.size--;
  this.removeTree();
  drawTree(this.toJSON(),this.size);
}

fixRemove(x, p) {
  while (x !== this.root && (x !== null && x.color === "BLACK")) {
      if (x === p.left) {
          let w = p.right;
          if (w && w.color === "RED") {
              w.color = "BLACK";
              p.color = "RED";
              this.rotateL(p);
              w = p.right;
          }
          if ((w.left === null || w.left.color === "BLACK") && 
              (w.right === null || w.right.color === "BLACK")) {
              if (w) w.color = "RED";
              x = p;
              p = p.parent;
          } else {
              if (w.right === null || w.right.color === "BLACK") {
                  if (w.left) w.left.color = "BLACK";
                  if (w) w.color = "RED";
                  this.rotateR(w);
                  w = p.right;
              }
              if (w) w.color = p.color;
              p.color = "BLACK";
              if (w.right) w.right.color = "BLACK";
              this.rotateL(p);
              x = this.root;
          }
      } else {
          let w = p.left;
          if (w && w.color === "RED") {
              w.color = "BLACK";
              p.color = "RED";
              this.rotateR(p);
              w = p.left;
          }
          if ((w.right === null || w.right.color === "BLACK") && 
              (w.left === null || w.left.color === "BLACK")) {
              if (w) w.color = "RED";
              x = p;
              p = p.parent;
          } else {
              if (w.left === null || w.left.color === "BLACK") {
                  if (w.right) w.right.color = "BLACK";
                  if (w) w.color = "RED";
                  this.rotateL(w);
                  w = p.left;
              }
              if (w) w.color = p.color;
              p.color = "BLACK";
              if (w.left) w.left.color = "BLACK";
              this.rotateR(p);
              x = this.root;
          }
      }
  }
  if (x) x.color = "BLACK";
}

findNode(data) {
  let current = this.root;
  while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
  }
  return null;
}

transplant(u, v) {
  if (u.parent === null) {
      this.root = v;
  } else if (u === u.parent.left) {
      u.parent.left = v;
  } else {
      u.parent.right = v;
  }
  if (v !== null) {
      v.parent = u.parent;
  }
}

minimum(node) {
  while (node.left !== null) {
      node = node.left;
  }
  return node;
}
}

// const tree = new RedBlackTree();
// tree.insert(5);
// tree.insert(15);
// tree.insert(3);
// tree.insert(7);
// tree.insert(5); // Duplicate; will not be added
// console.log(JSON.stringify(tree.toJSON(), null, 2));
