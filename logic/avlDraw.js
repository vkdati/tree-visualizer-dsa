class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Get the height of the node
    getHeight(node) {
        if (node === null) return 0;
        return node.height;
    }

    // Right rotate subtree rooted with y
    rightRotate(y) {
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

    // Left rotate subtree rooted with x
    leftRotate(x) {
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

    // Get the balance factor of node
    getBalance(node) {
        if (node === null) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Insert a new value into the AVL Tree
    insert(node, value) {
        // Perform normal BST insertion
        if (node === null) return new AVLNode(value);
        if (value < node.value) node.left = this.insert(node.left, value);
        else if (value > node.value) node.right = this.insert(node.right, value);
        else return node; // No duplicate values allowed

        // Update height of the ancestor node
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        // Get the balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) return this.rightRotate(node);

        // Right Right Case
        if (balance < -1 && value > node.right.value) return this.leftRotate(node);

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node; // Return the unchanged node pointer
    }

    // Helper function to initiate the insert process
    insertValue(value) {
        this.root = this.insert(this.root, value);
    }

    // In-order traversal for AVL Tree
    inOrderTraversal(node = this.root) {
        if (node) {
            this.inOrderTraversal(node.left);
            console.log(node.value);
            this.inOrderTraversal(node.right);
        }
    }

    // Convert AVL Tree to JSON for D3 visualization
    toJSON(node = this.root) {
        if (node === null) return null;

        const jsonNode = {
            value: node.value,
            children: []
        };

        if (node.left || node.right) {
            jsonNode.children.push(node.left ? this.toJSON(node.left) : { value: "Empty", children: [] });
            jsonNode.children.push(node.right ? this.toJSON(node.right) : { value: "Empty", children: [] });
        }

        return jsonNode;
    }

    // Initialize tree with values
    initializeTree(arr) {
        arr.forEach(value => {
            this.insertValue(value);
        });
        console.log(JSON.stringify(this.toJSON(), null, 2));
        this.removeTree();
        drawTree(this.toJSON(), arr.length);
    }

    // Remove SVG for updating the tree graph
    removeTree() {
        const graph = document.querySelector("svg");
        if (graph) graph.parentElement.removeChild(graph);
    }
}

// Usage
// const avlTree = new AVLTree();
// const arr = [30, 20, 40, 10, 25, 35, 50];
// avlTree.initializeTree(arr);
