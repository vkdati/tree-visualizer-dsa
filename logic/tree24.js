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
    delete(value) {
        if (this.deleteRecursive(this.root, value)) {
            console.log(`${value} was deleted.`);
        } else {

            console.log(`${value} not found in the tree.`);
        }
    
        if (this.root.keys.length === 0 && !this.root.isLeaf) {
            this.root = this.root.children[0];
        }
        this.removeTree();
        drawTree(this.toJSON(),this.size);
    }
    
    deleteRecursive(node, value) {
        // Same logic as before, but add a return value to indicate success or failure
        let idx = node.keys.findIndex(key => key === value);
        
        if (idx !== -1) {
            if (node.isLeaf) {
                node.keys.splice(idx, 1);
                return true;
            } else {
                this.deleteInternalNodeKey(node, idx);
                return true;
            }
        } else if (!node.isLeaf) {
            let childIndex = node.keys.findIndex(key => key > value);
            if (childIndex === -1) childIndex = node.keys.length;
    
            const child = node.children[childIndex];
            if (child.keys.length < 2) {
                this.fillChild(node, childIndex);
            }
            return this.deleteRecursive(node.children[childIndex], value);
        }
    
        return false;  // Value not found in the tree
    }

    deleteInternalNodeKey(node, idx) {
        const leftChild = node.children[idx];
        const rightChild = node.children[idx + 1];

        if (leftChild.keys.length >= 2) {
            node.keys[idx] = this.getPredecessor(leftChild);
            this.deleteRecursive(leftChild, node.keys[idx]);
        } else if (rightChild.keys.length >= 2) {
            node.keys[idx] = this.getSuccessor(rightChild);
            this.deleteRecursive(rightChild, node.keys[idx]);
        } else {
            this.mergeNodes(node, idx);
            this.deleteRecursive(leftChild, value);
        }
    }

    fillChild(node, i) {
        if (i > 0 && node.children[i - 1].keys.length >= 2) {
            this.borrowFromPrev(node, i);
        } else if (i < node.children.length - 1 && node.children[i + 1].keys.length >= 2) {
            this.borrowFromNext(node, i);
        } else {
            if (i < node.children.length - 1) {
                this.mergeNodes(node, i);
            } else {
                this.mergeNodes(node, i - 1);
            }
        }
    }

    borrowFromPrev(node, i) {
        const child = node.children[i];
        const sibling = node.children[i - 1];

        child.keys.unshift(node.keys[i - 1]);
        node.keys[i - 1] = sibling.keys.pop();

        if (!child.isLeaf) {
            child.children.unshift(sibling.children.pop());
        }
    }

    borrowFromNext(node, i) {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        node.keys[i] = sibling.keys.shift();

        if (!child.isLeaf) {
            child.children.push(sibling.children.shift());
        }
    }

    mergeNodes(node, i) {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i], ...sibling.keys);
        child.children.push(...sibling.children);

        node.keys.splice(i, 1);
        node.children.splice(i + 1, 1);
    }

    getPredecessor(node) {
        while (!node.isLeaf) node = node.children[node.keys.length];
        return node.keys[node.keys.length - 1];
    }

    getSuccessor(node) {
        while (!node.isLeaf) node = node.children[0];
        return node.keys[0];
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
