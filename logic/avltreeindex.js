var Tree = new AVLTree();
function getInpt()
{
    // var value = document.getElementById("inpt").value;
    // var arr = value.split(" ");
    // console.log(arr);
    // var num = [];
    // var searchButton = document.getElementById(".searchbutn");
    // for(let i = 0;i<arr.length;i++)
    // {
    //    // var cleanedStr = arr[i].replace(/[^0-9]/g, ''); //regex cleanup
    //    var cleanedStr = arr[i].replace(/[^-\d]/g, ''); //accounts for -ve numbers
    //     if(cleanedStr=='') continue;
    //     var intval = parseInt(cleanedStr,10);
    //     if(isNaN(intval)) continue;
    //     num.push(intval);
    // }
    // console.log(num);
    // var newTree = new AVLTree();
    // newTree.takeInpt(num);
    // initializeZoom();\
    var value = parseInt(document.getElementById("inptkey").value);
    document.getElementById("inptkey").value = "";
    Tree.takeInpt(value);
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