var Tree = new Tree24();
function getInpt() {
    
    var value = parseInt(document.getElementById("inptkey").value);
    if(value=="")
    {
        return;
    }
    document.getElementById("inptkey").value = "";
    Tree.takeInpt(value);
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
    var searchInpt = document.getElementById("inptkey").value;
    var searchKey = parseInt(searchInpt);
    if (searchInpt== "")
    {
        return;
    }
    search(searchKey);
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
