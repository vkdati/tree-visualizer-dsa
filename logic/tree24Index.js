var Tree = new Tree24();
function getInpt() {
    
    var input = parseInt(document.getElementById("inptkey").value);
    console.log(input);
    if(input==NaN)
    {
        return;
    }
    document.getElementById("inptkey").value = "";
    Tree.insert(input);
    Tree.removeTree();
    drawTree(Tree.toJSON(),Tree.size);
    initializeZoom();
}

function initializeZoom(){
    let zoom = d3.zoom()
    .on('zoom',handleZoom);
    function handleZoom(e)
    {
       
        d3.select('svg g')
        .attr('transform',e.transform);
    }
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
