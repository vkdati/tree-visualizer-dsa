 function drawTree(data,size)
{
   console.log(size);
   window.sizeOfArray = size;
    const margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    },
        width = (600) - margin.right - margin.left,
        height = Math.max((200*(size/10 +1)),600) - margin.top - margin.bottom;
    window.treeLayout = d3.tree().size([height,width]);
   window.root = d3.hierarchy(data);
   treeLayout(root);
   const links = root.links(); //used to be const
   const nodes = root.descendants();
        const filteredNodes = root.descendants().filter(d => d.data.value !== "Empty");
        const filteredLinks = root.links().filter(d => filteredNodes.includes(d.source) && filteredNodes.includes(d.target));

        filteredNodes.forEach(function(d)
    {
        d.y = d.depth*70; //scaling
        
    });

    filteredNodes.forEach(function(d)
    {
        // if(d.children){
        // if (d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")
        //     d.children.length = 0;
        //  console.log("deleting children array");
    // }
    })
    
   const svg = d3.select('.svgcontainer')
    .append('svg')
    .attr('id','outputsvg')
    .attr('onload','initializeZoom()')
    .attr('width', 1000)
    .attr('height', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.selectAll('.link')
        .data(filteredLinks)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr('d', d3.linkHorizontal()
        .x(d => d.x) 
        .y(d => d.y));
    
    const gNode = svg.selectAll('.node')
        .data(filteredNodes)
        .attr('id','nodes')
        .enter()
        .append('g')
        .attr('class', 'node')
    
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
        
    gNode.append('circle')
        .attr('r', 25)
        .style("fill", function (d, i) {

            return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray';
        })
    gNode.append('text')
        .attr('dy', 3)
        //.attr('x', d => d.children ? -8 : 8) // Position based on children
        .style('text-anchor',"middle")
        .text(d => d.data.value); // Use the value from the data

        initializeZoom();
        
}

function search(key)
{
    //resetting colors
    d3.selectAll(".node").select('circle').
    style("fill", function (d, i) {

        return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray'; 
    })
    console.log(window.root.children)
    recurseSearch(window.root,key);

}
function recurseSearch(node,key)
{
    if((!node.children)&&node.data.value != key)
    {
        console.log("key not found");
        d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill","red");
        var outptbox = document.getElementById("keystatus");
        console.log(outptbox);
        outptbox.innerHTML = "KEY NOT FOUND";
        return;
    }
    if(node.data.value == key)
    {
        d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill","#c655fa");
        var outptbox = document.getElementById("keystatus");
        outptbox.innerHTML = "KEY FOUND";
        return;
    }
    d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .style("fill","#5adb6d")
    .on("end",function()
    {
        if(key>node.data.value)
            {
                recurseSearch(node.children[1],key);
            }
            else
            {
                recurseSearch(node.children[0],key);
            }
    });
    
     //d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle').style("fill","red");
    
}
function deleteKey(key)
{
    //resetting colors
    d3.selectAll(".node").select('circle').
    style("fill", function (d, i) {

        return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray';
    })
    recurseDelete(window.root,key);

}
function removeTree()
    {
        var graph = document.querySelector("svg");
        if(graph){graph.parentElement.removeChild(graph)};
    }
function recurseDelete(node,key)
{
    if(node.data.value == key && !node.children)
    {
        //delete node
        //color the node red
        d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill","red").
        on("end",function(){
        node.data.value = "Empty";

        d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('text')
        .transition()
        .duration(1000) //changing text
        .ease(d3.easeLinear)
        .text("Empty")
        .on("end",function(){;
        console.log("delete node of value",key);
        removeTree();
        drawTree(JSON.parse(JSON.stringify(window.root.data,null,2)),window.sizeOfArray);
        console.log(JSON.stringify(window.root.data,null,2));
        })});
        return;
    }
    if(node.data.value == key && node.children)
    {
        var tempNode = getSuccessorOrPredecessor(node);
        console.log("value of tempnode is ",tempNode.data.value," finding succ/pre for ",node.data.value);
        //ease this value in
        //some color change
        d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill","#c655fa")
        .on("end",function(){
         node.data.value = tempNode.data.value;
        d3.selectAll(".node").filter(function(d) { return d.data.value == node.data.value; })
        .select('text')
        .transition()
        .duration(500)
        .tween("text", function(d) {
            var that = this;
            var i = d3.interpolate(this.textContent, d.data.value);
            return function(t) {
                that.textContent = Math.round(i(t)); 
            };
        }).on("end",function(){
            recurseDelete(tempNode,tempNode.data.value);
        })});
        return;
    }
    if(!node.children && node.data.value != key)
    {
        //node not found
        console.log("node not found");
        return;
    }
    d3.selectAll(".node").filter(function(d) {return d.data.value==node.data.value;}).select('circle')
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .style("fill","#5adb6d") //green for traversal
    .on("end",function()
    {
    if(key<node.data.value)
    {
        //color for recursive travel
        recurseDelete(node.children[0],key);
    }
    if(key>node.data.value)
    {
        recurseDelete(node.children[1],key);
    }
    });
}
function getSuccessorOrPredecessor(node)
{
    if(!node.children)
    {
        console.log("no children",node.data.value);
        return node;
    }  // preference to successor
    if(node.children[1].data.value != "Empty")
    {
        console.log(node.children);
        node = node.children[1];
        console.log("successor",node.data.value);
        while(node.children)
        {
            if(node.children[0].data.value == "Empty")
            {
                break;
            }
            node = node.children[0];
        }
        
        return node;
    }
    else
    {
        node = node.children[0];  //finding predecessor
       console.log("predecessor",node.data.value);
        while(node.children)
        {
            if(node.children[1].data.value == "Empty")
            {
                break;
            }
            node = node.children[1];
        }
        
        return node;

    }

}