function getInpt() {
    var value = document.getElementById("inpt").value;
    var arr = value.split(" ");
    console.log(arr);
    var num = [];
    for (let i = 0; i < arr.length; i++) {
        // Accounts for negative numbers
        var cleanedStr = arr[i].replace(/[^-\d]/g, ''); 
        if (cleanedStr == '') continue;
        var intval = parseInt(cleanedStr, 10);
        if (isNaN(intval)) continue;
        num.push(intval);
    }
    console.log(num);
    var newTree = new AVLTree(); // Use AVLTree here
    num.forEach(n => newTree.add(n)); // Insert all numbers into the AVL tree
    initializeZoom(); // Initialize zoom feature (as in your example)
    displayTree(newTree); // Display the AVL tree after insertion
}

function initializeZoom() {
    let zoom = d3.zoom().on('zoom', handleZoom);
    function handleZoom(e) {
        d3.select('svg g').attr('transform', e.transform);
    }
    d3.select('svg').call(zoom);
}

function searchNode() {
    var searchInpt = document.getElementById("searchkey").value;
    var searchKey = parseInt(searchInpt);
    if (searchInpt == "") {
        return;
    }
    var found = searchAVL(searchKey); // Implement search for AVL
    console.log(found ? "Node found!" : "Node not found!");
}

function deleteNode() {
    var deleteInpt = document.getElementById("searchkey").value;
    var keyToDelete = parseInt(deleteInpt);
    if (deleteInpt == "") {
        return;
    }
    tree.remove(keyToDelete); // Delete node in AVL tree
    console.log("Node deleted.");
    displayTree(tree); // Redraw tree after deletion
}

// Function to display the AVL tree (use D3 or console)
function displayTree(tree) {
    // Your code to display the AVL tree in console or with D3 (SVG rendering, for example)
    console.log("In-order traversal: " + tree.display());
}

// AVL Tree search function
function searchAVL(data) {
    let node = tree.root; // Start from root of AVL tree
    while (node) {
        if (data < node.data) {
            node = node.left;
        } else if (data > node.data) {
            node = node.right;
        } else {
            return true; // Found the node
        }
    }
    return false; // Node not found
}
