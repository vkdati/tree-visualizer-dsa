var Tree = new RedBlackTree();
function getInpt()
{
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