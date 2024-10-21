function drawTree2_4(data, size) {
    
    const margin = { top: 50, right: 20, bottom: 20, left: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
   
    const treeLayout = d3.tree().size([height, width]);

    // Convert data into a D3 hierarchy
    const root = d3.hierarchy(data);
    treeLayout(root);

    // Get the links (connections) and nodes (rectangles) from the root
    const links = root.links();
    const nodes = root.descendants();

    // Filter out any "Empty" nodes if necessary
    const filteredNodes = nodes.filter(d => d.data.keys.length > 0);
    const filteredLinks = links.filter(link => 
        filteredNodes.includes(link.source) && filteredNodes.includes(link.target)
    );

    // Set vertical spacing based on depth
    filteredNodes.forEach(d => {
        d.y = d.depth * 100;  
    });

    // Create an SVG container
    const svg = d3.select('.svgcontainer')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw links
    svg.selectAll('.link')
        .data(filteredLinks)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('d', d3.linkHorizontal()
            .x(d => d.target.x)  // Use target nodes x-coordinate
            .y(d => d.target.y)  // Use target nodes y-coordinate
        );

    // Draw nodes - rectangles for 2-4 tree nodes
    const gNode = svg.selectAll('.node')
        .data(filteredNodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Draw rectangles for each node to represent multiple keys
    gNode.append('rect')
        .attr('width', d => d.data.keys.length * 40)  // Width depends on the number of keys
        .attr('height', 40)
        .attr('x', d => -d.data.keys.length * 20)  // Center the rectangle horizontally
        .attr('y', -20)  
        .attr('fill', 'lightgray')
        .attr('stroke', 'black');

    // Draw text inside each rectangle for each key
    gNode.selectAll('.key')
        .data(d => d.data.keys.map((key, i) => ({ key, i })))  // Bind each key+ index
        .enter()
        .append('text')
        .attr('class', 'key')
        .attr('x', d => d.i * 40 - 10)  // Position each key inside the rectangle
        .attr('y', 5)
        .attr('text-anchor', 'middle')
        .text(d => d.key);

    // Initialize zooming
    initializeZoom();
}
