var Tree = new Tree24();
function getInpt() {
    
    var inpt = document.getElementById("inptkey").value;
    var input = parseInt(inpt);
    console.log(input);
    if(input==NaN || inpt == "")
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



function deleteNode() {
    // Get the value entered in the delete input field
    var deleteInpt = document.getElementById("inptkey").value;
    
    // Parse the value to an integer
    var keyToDelete = parseInt(deleteInpt);

    // If input is empty or not a number, return without doing anything
    if (isNaN(keyToDelete) || deleteInpt === "") {
        return;
    }

    // Call the delete function to remove the node from the 2-4 tree
    
    Tree.delete(keyToDelete);  // Assuming deleteKey is a method of Tree24
    
}
