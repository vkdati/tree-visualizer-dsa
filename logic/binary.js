class Node {
    constructor(value) {
        this.value = value;   // The value of the node
        this.left = null;     // Pointer to the left child
        this.right = null;    // Pointer to the right child
    }
}

class BinaryTree {
    constructor() {
        this.root = null; // Root of the binary tree
    }

    // Insert a new node in the binary tree
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode; // If tree is empty, set root to new node
        } else {
            this.insertNode(this.root, newNode); // Otherwise, insert it at the appropriate position
        }
    }

    // Helper function to insert a node in the correct position
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode; // If no left child, assign new node to the left
            } else {
                this.insertNode(node.left, newNode); // Recur down the left subtree
            }
        } else {
            if (node.right === null) {
                node.right = newNode; // If no right child, assign new node to the right
            } else {
                this.insertNode(node.right, newNode); // Recur down the right subtree
            }
        }
    }

    // In-order traversal of the tree
    inOrderTraversal(node = this.root) {
        if (node) {
            this.inOrderTraversal(node.left); // Visit left child
            console.log(node.value); // Visit node itself
            this.inOrderTraversal(node.right); // Visit right child
        }
    }

    // Search for a value in the tree
    search(value, node = this.root) {
        if (node === null) {
            return false; // Base case: value not found
        }
        if (value === node.value) {
            return true; // Base case: value found
        } else if (value < node.value) {
            return this.search(value, node.left); // Search left subtree
        } else {
            return this.search(value, node.right); // Search right subtree
        }
    }
}
