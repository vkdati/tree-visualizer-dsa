function drawTree(data, size) {
    console.log(size);
    window.sizeOfArray = size;

    const margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    };

    const width = 600 - margin.right - margin.left;
    const height = Math.max((200 * (size / 10 + 1)), 600) - margin.top - margin.bottom;

    window.treeLayout = d3.tree().size([height, width]);
    window.root = d3.hierarchy(data);
    treeLayout(window.root);
    
    const links = window.root.links(); // used to be const
    const nodes = window.root.descendants();
    const filteredNodes = nodes.filter(d => d.data.keys.length > 0); // Filter out nodes with no keys
    const filteredLinks = links.filter(d => filteredNodes.includes(d.source) && filteredNodes.includes(d.target));
    
    filteredNodes.forEach(function(d) {
        d.y = d.depth * 70; // scaling
    });
    
    filteredNodes.forEach(function(d) {
        // Uncommenting this part if needed in the future
        // if(d.children){
        //     if (d.children[0].data.keys.length === 0 && d.children[1].data.keys.length === 0)
        //         d.children.length = 0;
        //     console.log("deleting children array");
        // }
    });
    
    const svg = d3.select('.svgcontainer')
        .append('svg')
        .attr('id', 'outputsvg')
        .attr('onload', 'initializeZoom()')
        .attr('width', 1000)
        .attr('height', height) // Corrected to use height for SVG height
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
        .attr('id', 'nodes')
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
        gNode.append('rect')
        .attr('height', 50)
        .attr('width',function(d,i)
         {
            return (d.data.keys.length)*50;
        })
        .attr('rx',25)
        .attr('ry',25)
        .attr('x',function(d,i)
    {
        return ((d.data.keys.length)/2 + 1)*-25;
    })
        .style("fill", function (d, i) {
            return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray';
        });
    
    gNode.append('text')
        .attr('dy', 25)
        .attr('dx', function(d,i)
            {
                return (d.data.keys.length)*25;
            })
        .style('text-anchor', "middle")
        .attr('x',function(d,i)
    {
        return ((d.data.keys.length)/2 + 1)*-25;
    })
        .text(d => d.data.keys.join(', ')); // Use the keys from the 2-4 tree data
    
    initializeZoom();
    
}

