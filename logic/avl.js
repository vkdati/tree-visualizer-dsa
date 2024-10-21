class AVLNode {
    constructor(value, parent = null) {
        this.value = value;   // The value of the node
        this.left = null;     // Pointer to the left child
        this.right = null;    // Pointer to the right child
        this.height = 1;      // Height of the node, used to balance the tree
        this.parent = parent;
    }
}

class AVLTree {
    constructor() {
        this.root = null; // Root of the AVL tree
    }

    // Helper function to get the height of a node
    height(node) {
        if (node === null) return 0;
        return node.height;
    }

    // Get the balance factor of a node
    getBalance(node) {
        if (node === null) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    // Perform a right rotation
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        // Return new root
        return x;
    }

    // Perform a left rotation
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        // Return new root
        return y;
    }

    // Insert a node in the AVL tree
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    // Recursive function to insert a new node and balance the tree
    insertNode(node, value) {
        // Perform the normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node; // Duplicate values are not allowed
        }

        // Update height of this ancestor node
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        // Get the balance factor of this ancestor node
        const balance = this.getBalance(node);

        // If the node becomes unbalanced, there are 4 cases

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        // Return the (unchanged) node pointer
        return node;
    }

    // In-order traversal of the tree
    inOrderTraversal(node = this.root) {
        if (node) {
            this.inOrderTraversal(node.left); // Visit left child
            console.log(node.value); // Visit node itself
            this.inOrderTraversal(node.right); // Visit right child
        }
    }

    // Convert the tree to JSON format for visualization
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

    // Function to remove the tree visualization (same as in your BinaryTree)
    removeTree() {
        var graph = document.querySelector("svg");
        if (graph) { graph.parentElement.removeChild(graph); }
    }

    // Function to take input array and build the AVL tree
    takeInpt(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }
        this.removeTree();
        console.log(JSON.stringify(this.toJSON(), null, 2));
        drawTree(this.toJSON(), arr.length); // Call to draw AVL Tree
    }

    getRoot() {
        return this.root;
    }
}
