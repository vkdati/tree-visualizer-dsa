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

    
}

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

    gNode.append('circle')
    .attr('r', 25)
    .style("fill", function (d, i) {
        return (d.children && !(d.children[0].data.value == "Empty" && d.children[1].data.value == "Empty")) || d._children ? '#f0bc3e' : 'lightgray';
    });

gNode.append('text')
    .attr('dy', 3)
    .style('text-anchor', "middle")
    .text(d => d.data.keys.join(', ')); // Use the keys from the 2-4 tree data

initializeZoom();

function search(key) {
    // Resetting colors
    d3.selectAll(".node").select('circle')
        .style("fill", function (d, i) {
            return (d.children && !(d.children[0].data.keys.length === 0 && d.children[1].data.keys.length === 0)) || d._children ? '#f0bc3e' : 'lightgray'; 
        });
    
    console.log(window.root.children);
    recurseSearch(window.root, key);
}
  
function search(key) {
    // Resetting colors
    d3.selectAll(".node").select('circle')
        .style("fill", function (d, i) {
            return (d.children && d.children.length > 0) || d._children ? '#f0bc3e' : 'lightgray'; 
        });

    console.log(window.root.children);
    recurseSearch(window.root, key);
}

function recurseSearch(node, key) {
    if (!node.children.length && node.keys[0] !== key && node.keys[1] !== key && node.keys[2] !== key) {
        console.log("key not found");
        d3.selectAll(".node").filter(function(d) { return d.keys.includes(node.keys[0]) || d.keys.includes(node.keys[1]) || d.keys.includes(node.keys[2]); }).select('circle')
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "red");
        
        var outptbox = document.getElementById("keystatus");
        outptbox.innerHTML = "KEY NOT FOUND";
        return;
    }

    if (node.keys.includes(key)) {
        d3.selectAll(".node").filter(function(d) { return d.keys.includes(node.keys[0]) || d.keys.includes(node.keys[1]) || d.keys.includes(node.keys[2]); }).select('circle')
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "#c655fa");
        
        var outptbox = document.getElementById("keystatus");
        outptbox.innerHTML = "KEY FOUND";
        return;
    }

    d3.selectAll(".node").filter(function(d) { return d.keys.includes(node.keys[0]) || d.keys.includes(node.keys[1]) || d.keys.includes(node.keys[2]); }).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill", "#5adb6d")
        .on("end", function() {
            if (key > node.keys[2]) {
                recurseSearch(node.children[3], key);
            } else if (key > node.keys[1]) {
                recurseSearch(node.children[2], key);
            } else if (key > node.keys[0]) {
                recurseSearch(node.children[1], key);
            } else {
                recurseSearch(node.children[0], key);
            }
        });
}

function deleteKey(key) {
    // resetting colors
    d3.selectAll(".node").select('circle')
        .style("fill", function(d, i) {
            return (d.children.length > 0 && !(d.children[0].keys.every(k => k === "Empty"))) || d._children ? '#f0bc3e' : 'lightgray';
        });
    
    recurseDelete(window.root, key);
}

function removeTree() {
    var graph = document.querySelector("svg");
    if (graph) {
        graph.parentElement.removeChild(graph);
    }
}

function recurseDelete(node, key) {
    // Check for leaf node
    if (node.keys.includes(key) && node.children.length === 0) {
        // Delete the key from the node
        d3.selectAll(".node").filter(function(d) { return d.keys.includes(key); }).select('circle')
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "red")
            .on("end", function() {
                // Set the key to "Empty"
                node.keys[node.keys.indexOf(key)] = "Empty";

                d3.selectAll(".node").filter(function(d) { return d.keys.includes("Empty"); }).select('text')
                    .transition()
                    .duration(1000) // Changing text
                    .ease(d3.easeLinear)
                    .text("Empty")
                    .on("end", function() {
                        console.log("Deleted key", key);
                        removeTree();
                        drawTree(JSON.parse(JSON.stringify(window.root.data, null, 2)), window.sizeOfArray);
                        console.log(JSON.stringify(window.root.data, null, 2));
                    });
            });
        return;
    }

    // Check for internal node
    if (node.keys.includes(key) && node.children.length > 0) {
        var tempNode = getSuccessorOrPredecessor(node); // Find successor or predecessor
        console.log("Value of tempNode is ", tempNode.keys, " finding successor/predecessor for ", node.keys);

        d3.selectAll(".node").filter(function(d) { return d.keys.includes(key); }).select('circle')
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "#c655fa") // Change color to indicate the node being replaced
            .on("end", function() {
                // Replace key with tempNode's key
                node.keys[node.keys.indexOf(key)] = tempNode.keys[0]; // Assume replacing first key
                d3.selectAll(".node").filter(function(d) { return d.keys.includes(tempNode.keys[0]); })
                    .select('text')
                    .transition()
                    .duration(500)
                    .tween("text", function(d) {
                        var that = this;
                        var i = d3.interpolate(this.textContent, tempNode.keys[0]);
                        return function(t) {
                            that.textContent = Math.round(i(t)); 
                        };
                    }).on("end", function() {
                        recurseDelete(tempNode, tempNode.keys[0]); // Delete the successor/predecessor
                    });
            });
        return;
    }

    // Node not found
    if (!node.children.length && !node.keys.includes(key)) {
        console.log("Node not found");
        return;
    }

    d3.selectAll(".node").filter(function(d) { return d.keys.includes(node.keys[0]); }).select('circle')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style("fill", "#5adb6d") // Green for traversal
        .on("end", function() {
            if (key < node.keys[0]) {
                recurseDelete(node.children[0], key); // Traverse left
            } else {
                recurseDelete(node.children[1], key); // Traverse right
            }
        });
}

function getSuccessorOrPredecessor(node) {
    // If there are no children, return the current node
    if (node.children.length === 0) {
        console.log("no children", node.keys);
        return node;
    } 

    // Prefer to find the successor
    if (node.children.length > 1 && node.children[1].keys[0] !== "Empty") {
        console.log(node.children);
        node = node.children[1]; // Move to the right child
        console.log("successor", node.keys);

        // Traverse to the leftmost child
        while (node.children.length > 0) {
            if (node.children[0].keys[0] === "Empty") {
                break;
            }
            node = node.children[0];
        }
        
        return node; // Return the successor
    } else {
        // Finding the predecessor
        node = node.children[0]; // Move to the left child
        console.log("predecessor", node.keys);

        // Traverse to the rightmost child
        while (node.children.length > 0) {
            if (node.children[node.children.length - 1].keys[0] === "Empty") {
                break;
            }
            node = node.children[node.children.length - 1];
        }
        
        return node; // Return the predecessor
    }
}
