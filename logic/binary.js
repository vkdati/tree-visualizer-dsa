
class Node {
    constructor(value,parent = "") {
        this.value = value;   // The value of the node
        this.left = null;     // Pointer to the left child
        this.right = null;    // Pointer to the right child
        this.children = [];
        this.parent = parent;
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
        } else if(newNode.value>node.value){
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
    removeTree()
    {
        var graph = document.querySelector("svg");
        if(graph){graph.parentElement.removeChild(graph)};
    }
    takeInpt(arr)
    {

        for(let i = 0;i<arr.length;i++)
        {
            this.insert(arr[i]);
        }
        this.removeTree();
        console.log(JSON.stringify(this.toJSON(),null,2));
        drawTree(this.toJSON());
    }
    
    getRoot()
    {
        return this.root;
    }
    
}
// const y = new BinaryTree();
// const arra = [5,4,6,1,2]; //test value
// y.takeInpt(arra);
// var jsonshi = y.toJSON();
// console.log(JSON.stringify(jsonshi,null,2));
// drawTree(jsonshi,arra.size);
// console.log("here");
// console.log(y.nodeList);