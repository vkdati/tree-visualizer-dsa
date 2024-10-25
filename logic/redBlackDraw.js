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
        // const filteredNodes = root.descendants().filter(d => d.data.value !== "Empty");
        // const filteredLinks = root.links().filter(d => filteredNodes.includes(d.source) && filteredNodes.includes(d.target));

        nodes.forEach(function(d)
    {
        d.y = d.depth*70; //scaling
        
    });
    const svg = d3.select('.svgcontainer')
    .append('svg')
    .attr('id','outputsvg')
    .attr('onload','initializeZoom()')
    .attr('width', 1000)
    .attr('height', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.selectAll('.link')
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr('d', d3.linkHorizontal()
        .x(d => d.x) 
        .y(d => d.y));
    
    const gNode = svg.selectAll('.node')
        .data(nodes)
        .attr('id','nodes')
        .enter()
        .append('g')
        .attr('class', 'node')
    
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    gNode.append('circle')
        .attr('r', 25)
        .style("fill", function (d, i) {

            // return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray';
            if(d._children || d.data.value == "Empty")
            {
                return "lightgrey";
            }
            else if(d.data.color == "RED")
            {
                return "red";
            }
            else
            {
                return "black";
            }
        })
    gNode.append('text')
        .attr('dy', 3)
        //.attr('x', d => d.children ? -8 : 8) // Position based on children
        .style('text-anchor',"middle")
        .text(d => d.data.value)
        .style('fill','white'); // Use the value from the data
        initializeZoom();

}