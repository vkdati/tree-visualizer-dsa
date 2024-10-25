function getInpt() {
    
    var value = document.getElementById("inpt").value;
    
    // Split string into substrings arr
    var arr = value.split(" ");
    
    // Initialize an empty array
    var num = [];

    // Loop through the arr of substrings
    for (let i = 0; i < arr.length; i++) {
        // Remove non-numeric characters(-ve no possible)
        var cleanedStr = arr[i].replace(/[^-\d]/g, '');

        // Skip empty strings
        if (cleanedStr == '') continue;

        // Convert the cleaned str to an int
        var intval = parseInt(cleanedStr, 10);

        // Skip if the converted value is not a valid no.
        if (isNaN(intval)) continue;

        // Push valid integers to the num array
        num.push(intval);
    }

    // Create a new 2-4 tree instance
    var newTree = new Tree24();

    // Take the valid numbers and insert them into the 2-4 tree
    for (let i = 0; i < num.length; i++) {
        newTree.insert(num[i]); // Inserting value
    }

    // Store the new tree as a global variable to access during search and delete
    window.currentTree = newTree;

    //  zoom functionality for the tree
    initializeZoom();
}

function initializeZoom() {
    // Define the zoom behavior using D3.js
    let zoom = d3.zoom().on('zoom', handleZoom);

    // Handle zoom by transforming the SVG group element
    function handleZoom(e) {
        d3.select('svg g')
            .attr('transform', e.transform);
    }

    // Apply the zoom behavior to the SVG element
    d3.select('svg').call(zoom);
}

function searchNode() {
    // Get the value entered in the search input field
    var searchInpt = document.getElementById("searchkey").value;

    // Parse the value to an integer
    var searchKey = parseInt(searchInpt);

    // If input is empty or not a number, return without doing anything
    if (isNaN(searchKey) || searchInpt === "") {
        return;
    }

    // Call the search function to find the node in the 2-4 tree
    if (window.currentTree) {
        window.currentTree.search(searchKey);  // Assuming search is a method of Tree24
    }
}

function deleteNode() {
    // Get the value entered in the delete input field
    var deleteInpt = document.getElementById("deletekey").value;

    // Parse the value to an integer
    var keyToDelete = parseInt(deleteInpt);

    // If input is empty or not a number, return without doing anything
    if (isNaN(keyToDelete) || deleteInpt === "") {
        return;
    }

    // Call the delete function to remove the node from the 2-4 tree
    if (window.currentTree) {
        window.currentTree.deleteKey(keyToDelete);  // Assuming deleteKey is a method of Tree24
    }
}
