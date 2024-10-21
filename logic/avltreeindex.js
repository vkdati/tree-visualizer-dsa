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

    getHeight(node) {
        return node === null ? 0 : node.height;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    getBalance(node) {
        return node === null ? 0 : this.getHeight(node.left) - this.getHeight(node.right);
    }

    insert(node, value) {
        if (node === null) return new AVLNode(value);
        if (value < node.value) node.left = this.insert(node.left, value);
        else if (value > node.value) node.right = this.insert(node.right, value);
        else return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        const balance = this.getBalance(node);

        if (balance > 1 && value < node.left.value) return this.rightRotate(node);
        if (balance < -1 && value > node.right.value) return this.leftRotate(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    deleteNode(root, key) {
        if (root === null) return root;

        if (key < root.value) root.left = this.deleteNode(root.left, key);
        else if (key > root.value) root.right = this.deleteNode(root.right, key);
        else {
            if ((root.left === null) || (root.right === null)) {
                const temp = root.left ? root.left : root.right;
                if (temp === null) {
                    root = null;
                } else {
                    root = temp;
                }
            } else {
                const temp = this.getMinValueNode(root.right);
                root.value = temp.value;
                root.right = this.deleteNode(root.right, temp.value);
            }
        }

        if (root === null) return root;

        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;

        const balance = this.getBalance(root);

        if (balance > 1 && this.getBalance(root.left) >= 0) return this.rightRotate(root);
        if (balance > 1 && this.getBalance(root.left) < 0) {
            root.left = this.leftRotate(root.left);
            return this.rightRotate(root);
        }
        if (balance < -1 && this.getBalance(root.right) <= 0) return this.leftRotate(root);
        if (balance < -1 && this.getBalance(root.right) > 0) {
            root.right = this.rightRotate(root.right);
            return this.leftRotate(root);
        }

        return root;
    }

    getMinValueNode(node) {
        let current = node;
        while (current.left !== null) current = current.left;
        return current;
    }

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

    initializeTree(arr) {
        arr.forEach(value => {
            this.root = this.insert(this.root, value);
        });
        console.log(JSON.stringify(this.toJSON(), null, 2));
        removeTree();
        drawTree(this.toJSON(), arr.length);
    }

    removeTree() {
        const graph = document.querySelector("svg");
        if (graph) graph.parentElement.removeChild(graph);
    }

    searchNode(root, key) {
        if (root === null) return null;
        if (root.value === key) return root;
        if (key < root.value) return this.searchNode(root.left, key);
        return this.searchNode(root.right, key);
    }
}

// Replace `BinaryTree` with `AVLTree` in your original functions

function getInpt() {
    const value = document.getElementById("inpt").value;
    const arr = value.split(" ");
    const num = [];
    for (let i = 0; i < arr.length; i++) {
        const cleanedStr = arr[i].replace(/[^-\d]/g, '');
        if (cleanedStr === '') continue;
        const intval = parseInt(cleanedStr, 10);
        if (isNaN(intval)) continue;
        num.push(intval);
    }
    const newTree = new AVLTree();
    newTree.initializeTree(num);
    initializeZoom();
}

function searchNode() {
    const searchInpt = document.getElementById("searchkey").value;
    const searchKey = parseInt(searchInpt);
    if (searchInpt === "") return;
    const result = window.avlTree.searchNode(window.avlTree.root, searchKey);
    if (result) {
        console.log("KEY FOUND");
        search(searchKey);
    } else {
        console.log("KEY NOT FOUND");
    }
}

function deleteNode() {
    const deleteInpt = document.getElementById("searchkey").value;
    const keyToDelete = parseInt(deleteInpt);
    if (deleteInpt === "") return;
    window.avlTree.root = window.avlTree.deleteNode(window.avlTree.root, keyToDelete);
    removeTree();
    drawTree(window.avlTree.toJSON(), window.avlTree.root ? window.avlTree.root.height : 0);
}

// Keep your zoom function unchanged
function initializeZoom() {
    let zoom = d3.zoom().on('zoom', handleZoom);
    function handleZoom(e) {
        d3.select('svg g').attr('transform', e.transform);
    }
    d3.select('svg').call(zoom);
}
