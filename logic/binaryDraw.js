 function drawTree(data)
{
   
    const margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    },
        width = (600) - margin.right - margin.left,
        height = (600) - margin.top - margin.bottom;
    const treeLayout = d3.tree().size([height,width]);
   const root = d3.hierarchy(data);
   treeLayout(root);
   const links = root.links();
   const nodes = root.descendants();
        const filteredNodes = root.descendants().filter(d => d.data.value !== "Empty");
        const filteredLinks = root.links().filter(d => filteredNodes.includes(d.source) && filteredNodes.includes(d.target));

        filteredNodes.forEach(function(d)
    {
        d.y = d.depth*70; //scaling
    });
    
   const svg = d3.select('.svgcontainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
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
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
        
    gNode.append('circle')
        .attr('r', 25)
        .style("fill", function (d, i) {

            return d.children || d._children ? '#f0bc3e' : 'lightgray'; 
        })
    gNode.append('text')
        .attr('dy', 3)
        //.attr('x', d => d.children ? -8 : 8) // Position based on children
        .style('text-anchor',"middle")
        .text(d => d.data.value); // Use the value from the data
        
}
