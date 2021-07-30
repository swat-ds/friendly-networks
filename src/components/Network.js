import React from "react";
import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
const nodesInJSON = require("../assets/data/dataTable.json");
const linksInJSON = require("../assets/data/relationshipTable.json");

//What parameters to be the depth of

const Network = () => {
  const [nodes, setNodes] = useState(nodesInJSON);
  const [links, setLinks] = useState(linksInJSON);
  console.log(nodes);
  console.log(links);

  // const nodes = [
  //   { "id": "Alice" },
  //   { "id": "Bob" },
  //   { "id": "Carol"},

  // ];

  // const links = [
  //   { "source": "Alice", "label": "a", "target": "Bob" }, // Alice → Bob
  //   { "source": "Bob", "label": "a", "target": "Carol" }, // Bob → Carol
  //   { "source": "James", "label": "a", "target": "Alice" }, //James -> Alice
  //   { "source": "Bob", "label": "a", "target": "James" },
  //  ] //Bob -> James
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    let width = +svg.attr("width");
    let height = +svg.attr("height");
    let centerX = width / 2;
    let centerY = height / 2;
    // let transform = d3.zoomIdentity;

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(50)
          .id((node) => node.id)
      )
      .force("center", d3.forceCenter(centerX, centerY));

    const dragInteraction = d3.drag().on("drag", (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });
    const lines = svg
    //   .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", (link) => {
        return link.label == "acquaintanceOf" ? "gray" : "green";
      });
const zoomRect = svg
//   .append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all");

    const circles = svg
    //   .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (node) => {
        //John Hunt has 2 records;
        return node.id == "w6n9820p" ? 30 : 10;
      })
      .call(dragInteraction)
      .style("stroke", "#bd0fdb")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "10,3")
      .style("fill", "#13a5d6")
      ;
// function zoomed() {
//   transform = d3.event.transform;
//   circles.attr("transform", d3.event.transform);
//   lines.attr("transform", d3.event.transform);
// }
//   const zoom = d3
//     .zoom()
//     .scaleExtent([1 / 2, 64])
//     .on("zoom", zoomed);

//   zoomRect.call(zoom).call(zoom.translateTo, 0, 0);

    const text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .text((node) => {
        let nameParts = node.label.split(",");
        let lastName = nameParts[0];
        let firstName =
          nameParts.length > 2
            ? nameParts[nameParts.length - 2]
            : nameParts[nameParts.length - 1];
        let fullName = `${firstName} ${lastName}`;
        return fullName;
      });

    simulation.on("tick", () => {
      circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
      text.attr("x", (node) => node.x).attr("y", (node) => node.y);
      lines
        .attr("x1", (link) => link.source.x)
        .attr("y1", (link) => link.source.y)
        .attr("x2", (link) => link.target.x)
        .attr("y2", (link) => link.target.y);
    });
  }, [nodes, links]);

  return (
    <Row >
      <svg
        ref={svgRef}
        id="container"
        width="960"
        height="500"
        overflow="auto"
        style={{ border: "thin solid blue" }}
      ></svg>
    </Row>
  );
};

export default Network;
