class Node24 {
    constructor() {
        this.keys = [];
        this.children = [];
        this.isLeaf = true;
    }

    insertKey(key) {
        this.keys.push(key);
        this.keys.sort((a, b) => a - b);  // Sort keys in ascending order
    }

    isFull() {
        return this.keys.length === 3;  // 2-4 trees allow up to 3 keys
    }

    containsKey(key) {
        return this.keys.includes(key);  // Check if the key already exists
    }
}

class Tree24 {
    constructor() {
        this.root = new Node24();  // Start with an empty root node
        this.size = 0;
    }

    insert(value) {
        if (this.contains(value, this.root)) {
            console.log(`Duplicate value ${value} not inserted.`);
            return;  // Prevent duplicate insertion
        }

        const root = this.root;

        if (root.isFull()) {
            // If the root is full, split it and create a new root
            const newRoot = new Node24();
            newRoot.isLeaf = false; // The new root is not a leaf
            newRoot.children.push(this.root); // Old root becomes a child

            // Split the full root
            this.splitNode(newRoot, 0);

            // Update the root reference
            this.root = newRoot;
        }

        this.insertNonFull(this.root, value); // Insert the value in the non-full node
    }

    insertNonFull(node, value) {
        if (node.isLeaf) {
            node.insertKey(value);  // Insert the key if it's a leaf node
            this.size++;
        } else {
            let i = node.keys.length - 1;
            while (i >= 0 && value < node.keys[i]) {
                i--;
            }
            i++;

            if (node.children[i].isFull()) {
                this.splitNode(node, i);  // Split the child if it's full

                if (value > node.keys[i]) {
                    i++;
                }
            }

            this.insertNonFull(node.children[i], value); // Recursively insert
        }
    }

    splitNode(parent, i) {
        const fullChild = parent.children[i];
        const newChild = new Node24();
        newChild.isLeaf = fullChild.isLeaf;

        const midKey = fullChild.keys[1]; // Middle key to move up
        parent.keys.splice(i, 0, midKey); // Add the middle key to the parent

        newChild.keys = fullChild.keys.splice(2); // Right half keys
        fullChild.keys.splice(1);  // Left half keys

        if (!fullChild.isLeaf) {
            newChild.children = fullChild.children.splice(2); // Right half children
        }

        parent.children.splice(i + 1, 0, newChild); // Insert new child
    }

    contains(value, node = this.root) {
        // Recursively check if the value already exists in the tree
        if (node.containsKey(value)) {
            return true;
        }

        if (node.isLeaf) {
            return false;
        }

        let i = 0;
        while (i < node.keys.length && value > node.keys[i]) {
            i++;
        }

        return this.contains(value, node.children[i]);
    }

    toJSON(node = this.root) {
        if (!node) return null;

        const jsonNode = {
            keys: node.keys.slice(), // Copy keys
            children: []  // Empty array for children
        };

        if (!node.isLeaf) {
            for (let i = 0; i < node.children.length; i++) {
                jsonNode.children.push(this.toJSON(node.children[i]));
            }
        }

        return jsonNode;
    }

    removeTree() {
        const graph = document.querySelector("svg");
        if (graph) {
            graph.parentElement.removeChild(graph); // Remove any existing SVG graph
        }
    }

    takeInpt(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }
        this.removeTree();  // Remove existing tree visualization
        console.log(JSON.stringify(this.toJSON(), null, 2));  // Print the tree as JSON
        drawTree2_4(this.toJSON());  // Visualize the tree
    }

    getRoot() {
        return this.root;
    }
}
