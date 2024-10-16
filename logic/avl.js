
    class Node {
      constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
      }
    }

    class AVLTree {
      constructor() {
        this.root = null;
      }

      height(n) {
        return n ? n.height : 0;
      }

      balanceFactor(n) {
        return n ? this.height(n.left) - this.height(n.right) : 0;
      }

      rotateR(y) {
        let x = y.left;
        let T = x.right;
        x.right = y;
        y.left = T;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x;
      }

      rotateL(x) {
        let y = x.right;
        let T = y.left;
        y.left = x;
        x.right = T;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y;
      }

      insert(node, data) {
        if (!node) return new Node(data);
        if (data < node.data) node.left = this.insert(node.left, data);
        else if (data > node.data) node.right = this.insert(node.right, data);
        else return node;

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let bf = this.balanceFactor(node);

        if (bf > 1 && data < node.left.data) return this.rotateR(node);
        if (bf < -1 && data > node.right.data) return this.rotateL(node);
        if (bf > 1 && data > node.left.data) {
          node.left = this.rotateL(node.left);
          return this.rotateR(node);
        }
        if (bf < -1 && data < node.right.data) {
          node.right = this.rotateR(node.right);
          return this.rotateL(node);
        }
        return node;
      }

      add(data) {
        this.root = this.insert(this.root, data);
      }

      inorder(node, res) {
        if (node) {
          this.inorder(node.left, res);
          res.push(node.data);
          this.inorder(node.right, res);
        }
      }

      display() {
        let res = [];
        this.inorder(this.root, res);
        return res.join(" ");
      }
    }

    const tree = new AVLTree();

    function addNode() {
      const val = parseInt(document.getElementById("val").value);
      if (!isNaN(val)) {
        tree.add(val);
        document.getElementById("out").textContent = "In-order: " + tree.display();
        document.getElementById("val").value = "";
      }
    }
 