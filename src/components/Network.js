import React from 'react'
import * as d3 from 'd3'
import {Container, Row, Col} from 'react-bootstrap'


//What parameters to be the depth of 

const Network = () => {
    // const nodes = [
//   { id: "Alice", val: 10 },
//   { id: "Bob", val: 12 },
//   { id: "Carol", val: 8 },
//   { id: "James", val: 15 },
// ];

// const links = [
//   { source: 0, target: 1 }, // Alice → Bob
//   { source: 1, target: 2 }, // Bob → Carol
//   { source: 3, target: 0 }, //James -> Alice
//   { source: 1, target: 3 }, //Bob -> James
// ];

// const svg = d3.select("#container");
// let width = +svg.attr('width')
// let height = +svg.attr("height");
// let centerX = width/2;
// let centerY = height/2;

// //Basic Pattern
// const circles = svg
//   .selectAll("circle")
//   .data(nodes)
//   .enter()
//   .append("circle")
//   .attr("r", (node) => node.val);

//   const lines = svg
//     .selectAll("line")
//     .data(links)
//     .enter()
//     .append("line")
//     .attr("stroke", "black")



// const simulation = d3
//   .forceSimulation(nodes)
//   .force("charge", d3.forceManyBody())
//   .force("link", d3.forceLink(links))
//   .force("center", d3.forceCenter(centerX, centerY));

// simulation.on("tick", () => {
//   circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y)
//   lines.attr("x1", (link) => link.source.x)
//     .attr("y1", (link) => link.source.y)
//     .attr("x2", (link) => link.target.x)
//     .attr("y2", (link) => link.target.y)
    return (
        <Row>
           <svg id="container" width="960" height="500" style={{border: "thin solid blue"}}></svg>
        </Row>
    )
}

export default Network
