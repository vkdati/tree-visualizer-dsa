window.Tree = new RedBlackTree();
function getInpt()
{
    var inpt = document.getElementById("inptkey").value;
    var input = parseInt(inpt);
    console.log(input);
    if(inpt==="")
    {
        return;
    }
    document.getElementById("inptkey").value = "";
    window.Tree.insert(input);
    window.Tree.removeTree();
    drawTree(window.Tree.toJSON(),window.Tree.size);
    initializeZoom();
    //test
    //console.log(JSON.stringify(Tree.toJSON(),null,2));
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

    function searchNode()
{
    
    var searchInpt = document.getElementById("inptkey").value;
    var searchKey = parseInt(searchInpt);
    if (searchInpt== "")
    {
        return;
    }
    if(searchKey == NaN)
    {
        return;
    }
    search(searchKey);
    
}
function deleteNode()
{
    var deleteInpt = document.getElementById("inptkey").value;
    if(deleteInpt == "")
    {
        return;
    }
    
    deleteKey(parseInt(deleteInpt));
    //window.Tree.remove(parseInt(deleteInpt));
    console.log(JSON.stringify(window.Tree.toJSON(),null,2));
    
    //Tree.rebalanceTree();
   //Tree.removeTree();
   
   // drawTree(Tree.toJSON(),Tree.size);
}