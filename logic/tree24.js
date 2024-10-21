class Node24 {
    constructor() {
        this.keys = [];      
        this.children = [];  
        this.isLeaf = true; 
    }

 
    insertKey(key) {
        this.keys.push(key);
        this.keys.sort((a, b) => a - b);  
    }

    isFull() {
        return this.keys.length === 3;
    }
}

class Tree24 {
    constructor() {
        this.root = new Node24();  // an empty node
    }

    // insert a new key into the 2-4 tree
    insert(value) {
        const root = this.root;

        if (root.isFull()) {
            // if the root is full, split it and create a new root
            const newRoot = new Node24();
            newRoot.isLeaf = false; //new root is not a leaf
            newRoot.children.push(this.root); // make the current root a child of the new root

            // split the full root
            this.splitNode(newRoot, 0);

            // update the root
            this.root = newRoot;
        }

        this.insertNonFull(this.root, value); // insert the value into the non-full node
    }

    // Insert into a non-full node
    insertNonFull(node, value) {
        if (node.isLeaf) {
     
            node.insertKey(value);
        } else {
            // If it's an internal node, find the correct child to insert the value
            let i = node.keys.length - 1;
            while (i >= 0 && value < node.keys[i]) {
                i--;
            }
            i++;

            if (node.children[i].isFull()) {
                // If the child is full, split it
                this.splitNode(node, i);

                // After splitting, decide which child to go to
                if (value > node.keys[i]) {
                    i++;
                }
            }

            this.insertNonFull(node.children[i], value); // Recursion used
        }
    }

    // Split a full child node of a given parent node at index i
    splitNode(parent, i) {
        const fullChild = parent.children[i];
        const newChild = new Node24();

        newChild.isLeaf = fullChild.isLeaf;

        // Moving the keys
        const midKey = fullChild.keys[1];
        parent.keys.splice(i, 0, midKey);

        // Splitting one node into two
        newChild.keys = fullChild.keys.splice(2, 1); // Right half
        fullChild.keys.splice(1); // Left half

        // If the full child has children, split them as well
        if (!fullChild.isLeaf) {
            newChild.children = fullChild.children.splice(2, 2); // right half of the children
        }

        parent.children.splice(i + 1, 0, newChild); // insert the new child into the parent's children
    }

    inOrderTraversal(node = this.root) {
        if (node) {
            for (let i = 0; i < node.keys.length; i++) {
                if (!node.isLeaf) {
                    this.inOrderTraversal(node.children[i]); 
                }
                console.log(node.keys[i]); 
            }

            if (!node.isLeaf) {
                this.inOrderTraversal(node.children[node.keys.length]);
            }
        }
    }

  //Json- JSON (JavaScript Object Notation) is a lightweight format used for storing and exchanging data. It is easy to read and write for humans, and easy to parse and generate for machines.
    toJSON(node = this.root) {
        if (!node) {
            return null; // Base case: empty node
        }

        const jsonNode = {
            keys: node.keys.slice(), // Copy the keys in this node
            children: [] // Initialize an empty array for children
        };

        if (!node.isLeaf) {
            // Recursively add children nodes if it's not a leaf
            for (let i = 0; i < node.children.length; i++) {
                jsonNode.children.push(this.toJSON(node.children[i]));
            }
        }

        return jsonNode;
    }

    // Remove existing SVG tree visualization
    //SVG (Scalable Vector Graphics) is a type of image format used to create graphics on websites.
    removeTree() {
        const graph = document.querySelector("svg");
        if (graph) {
            graph.parentElement.removeChild(graph); // Remove the SVG element if it exists
        }
    }

  
    takeInpt(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.insert(arr[i]); 
        }
        this.removeTree(); // Remove any existing tree visualization
        console.log(JSON.stringify(this.toJSON(), null, 2)); // Print the JSON representation of the tree
        drawTree2_4(this.toJSON()); // Visualize the tree (you need to implement the drawTree2_4 function)
    }

    // Get the root of the 2-4 tree
    getRoot() {
        return this.root;
    }
}

// D3.js (Data-Driven Documents): a powerful JavaScript library used for creating dynamic and interactive data visualizations in the web browser. It allows you to bind data to HTML, SVG, or CSS elements and apply data-driven transformations to the document.
// Example usage:
// const tree = new Tree24();
// const arr = [10, 20, 5, 15, 25, 30, 35]; // Example values to insert
// tree.takeInpt(arr); // Insert the values into the 2-4 tree and visualize it
// console.log(tree.getRoot()); // Get the root of the tree
// tree.inOrderTraversal(); // Perform in-order traversal to print values in ascending order
