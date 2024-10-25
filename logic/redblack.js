
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
            return null; // If the node is null, return null
        }

        // Create a JSON object for the current node
        const jsonNode = {
            value: node.data,
            children: [], // Initialize an empty array for children
            color : node.color
        };

        // Recursively convert left and right children to JSON
        if (node.left || node.right) { // Only add children if they exist
            if (node.left) {
                jsonNode.children.push(this.toJSON(node.left)); // Add left child
            } else {
                jsonNode.children.push({ value: "Empty", children: [], color : "NONE" }); // Add an "Empty" node
            }

            if (node.right) {
                jsonNode.children.push(this.toJSON(node.right)); // Add right child
            } else {
                jsonNode.children.push({ value: "Empty", children: [], color: "NONE" }); // Add an "Empty" node
            }
        }

        return jsonNode; // Return the JSON representation of the node
    }
    removeTree()
    {
      var graph = document.querySelector("svg");
      if(graph){graph.parentElement.removeChild(graph)};
    }
}

    // const tree = new Tree();

    // function addNode() {
    //   const val = parseInt(document.getElementById("val").value);
    //   if (!isNaN(val)) {
    //     tree.insert(val);
    //     document.getElementById("out").textContent = "In-order: " + tree.display();
    //     document.getElementById("val").value = "";
    //   }
    // }
// const tree = new RedBlackTree();
// tree.insert(5);
// tree.insert(15);
// tree.insert(3);
// tree.insert(7);
// console.log(JSON.stringify(tree.toJSON(),null,2));
    

