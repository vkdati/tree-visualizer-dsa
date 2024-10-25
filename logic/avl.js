class AVLNode {
  constructor(value, parent = "") {
      this.value = value;      // The value of the node
      this.left = null;        // Pointer to the left child
      this.right = null;       // Pointer to the right child
      this.height = 1;         // Height of the node (used to balance the tree)
      this.parent = parent;    // Reference to the parent node
  }
}

class AVLTree {
  constructor() {
      this.root = null; // Root of the AVL tree
      this.size = 0;
  }

  // Insert a new node in the AVL tree
  insert(value) {
      const newNode = new AVLNode(value);
      this.root = this.insertNode(this.root, newNode);
      this.size++;
  }

  // Helper function to insert a node in the correct position and balance the tree
  insertNode(node, newNode) {
      if (node === null) {
          return newNode; // If empty spot, insert the new node
      }

      if (newNode.value < node.value) {
          node.left = this.insertNode(node.left, newNode); // Insert in the left subtree
      } else if (newNode.value > node.value) {
          node.right = this.insertNode(node.right, newNode); // Insert in the right subtree
      } else {
          return node; // Duplicates are not allowed in AVL
      }

      // Update the height of the current node
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      // Balance the node if it becomes unbalanced
      const balance = this.getBalance(node);

      // Case 1: Left Left (Single Right Rotation)
      if (balance > 1 && newNode.value < node.left.value) {
          return this.rotateRight(node);
      }

      // Case 2: Right Right (Single Left Rotation)
      if (balance < -1 && newNode.value > node.right.value) {
          return this.rotateLeft(node);
      }

      // Case 3: Left Right (Double Rotation: Left then Right)
      if (balance > 1 && newNode.value > node.left.value) {
          node.left = this.rotateLeft(node.left);
          return this.rotateRight(node);
      }

      // Case 4: Right Left (Double Rotation: Right then Left)
      if (balance < -1 && newNode.value < node.right.value) {
          node.right = this.rotateRight(node.right);
          return this.rotateLeft(node);
      }

      return node; // Return the unchanged node pointer
  }
  
  // Helper function to get the height of the node
  getHeight(node) {
      if (node === null) {
          return 0;
      }
      return node.height;
  }

  // Helper function to get the balance factor of the node
  getBalance(node) {
      if (node === null) {
          return 0;
      }
      return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Rotate the subtree to the right
  rotateRight(y) {
      const x = y.left;
      const T2 = x.right;

      // Perform rotation
      x.right = y;
      y.left = T2;

      // Update heights
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

      // Return new root
      return x;
  }

  // Rotate the subtree to the left
  rotateLeft(x) {
      const y = x.right;
      const T2 = y.left;

      // Perform rotation
      y.left = x;
      x.right = T2;

      // Update heights
      x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
      y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

      // Return new root
      return y;
  }

  // In-order traversal of the tree (for debugging)
  inOrderTraversal(node = this.root) {
      if (node) {
          this.inOrderTraversal(node.left); // Visit left child
          console.log(node.value);          // Visit node itself
          this.inOrderTraversal(node.right); // Visit right child
      }
  }

  // Convert AVL tree to JSON format for visualization
  toJSON(node = this.root) {
      if (node === null) {
          return null; // If the node is null, return null
      }

      // Create a JSON object for the current node
      const jsonNode = {
          value: node.value,
          children: [] // Initialize an empty array for children
      };

      // Recursively convert left and right children to JSON
      if (node.left || node.right) { // Only add children if they exist
          if (node.left) {
              jsonNode.children.push(this.toJSON(node.left)); // Add left child
          } else {
              jsonNode.children.push({ value: "Empty", children: [] }); // Add an "Empty" node
          }

          if (node.right) {
              jsonNode.children.push(this.toJSON(node.right)); // Add right child
          } else {
              jsonNode.children.push({ value: "Empty", children: [] }); // Add an "Empty" node
          }
      }

      return jsonNode; // Return the JSON representation of the node
  }

  // Remove the tree visualization from the DOM (if needed)
  removeTree() {
      var graph = document.querySelector("svg");
      if (graph) {
          graph.parentElement.removeChild(graph);
      }
  }

  // Insert one value at a time into the AVL tree
  takeInpt(val) {
    //   for (let i = 0; i < arr.length; i++) {
    //       this.insert(arr[i]);
    //   }
    //   this.removeTree();
    //   console.log(JSON.stringify(this.toJSON(), null, 2));
    //   drawTree(this.toJSON(), arr.length);
    this.insert(val);
    this.removeTree();
    console.log(JSON.stringify(this.toJSON(),null,2));
    drawTree(this.toJSON(),this.size,this);
  }

  // Get the root of the AVL tree
  getRoot() {
      return this.root;
  }
  clear()
  {
    this.root = null;
    this.size = 0;
  }
  newJson(jsonNode)
  {
    this.clear();
    this.insertFromJSON(jsonNode);
    console.log(JSON.stringify(this.toJSON(),null,2));
    drawTree(this.toJSON(),this.size,this);
  }
  insertFromJSON(jsonNode) {

    if (jsonNode === null) {
        return; // Base case: if the node is null, do nothing
    }

    // Insert the value of the current node
    this.insert(jsonNode.value);

    // Recursively insert children
    for (const child of jsonNode.children) {
        this.insertFromJSON(child); // Insert each child node
    }
    
}
}

// Test code
// var avl = new AVLTree();
// avl.insert(10);
// avl.insert(20);
// avl.insert(30);
// avl.insert(40);
// avl.insert(50);
// avl.insert(25);
// var avlJSON = avl.toJSON();
// console.log(JSON.stringify(avlJSON,null,2));
