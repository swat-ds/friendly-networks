import React from "react";
import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/styles/styles.scss";
import '../assets/styles/network.scss'



/**
 * 
 * @param {*} nodesInJSON A json array contains multiple nodes as object
 * @param {*} linksInJSON A json array contains multiple link as object
 * @param {*} centralFigure An indication of whose entity is rendered
 * 
 * Note: all of the above @params are destructured from  @props @param
 * @returns a @Row element containing an svg
 */

const Network = ({ nodesInJSON, linksInJSON, centralFigure}) => {
  //states to changes nodes and links if needed
  const [nodes, setNodes] = useState(nodesInJSON);
  const [links, setLinks] = useState(linksInJSON);

  const svgRef = useRef(); // A reference to refer to the SVG element
  let width = 600, height = 600; //height of the svg

  //All the D3 data binding is inside the useEffect, will be re-rendered when nodes or links changes
  //Synonymous to componentDidMount() in the class version of the component
  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom().on("zoom", (event) => {
          svg.attr("transform", event.transform);
        })
      )
      .append("g"); //'g' is an encompassing tag that groups elements inside an svg

    //Creates a force directed graph simulation layout with nodes and links
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-2000))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(50)
          .id((node) => node.id)
      )
      .force("center", d3.forceCenter(width / 2, height / 2));

    //Feature to make the force directed graph zoomable
    const dragInteraction = d3.drag().on("drag", (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(.2);
      simulation.restart();
    });
    //Bind a line to each link
    const lines = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", (link) => {
        return link.label == "acquaintanceOf" ? "#6fad11" : "purple";
      })
      .attr("stroke-width", 5);

    //Bind a circle to each node
    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (node) => {
        //John Hunt has 2 records;
        return node.id == centralFigure ? 50 : 30; //Accentuates the centralFigure with bigger radius
      })
      .call(dragInteraction)
      .style("stroke", "#bd0fdb")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2,3")
      .style("fill", "#13a5d6");

    //Bind the name of each person to the corresponding node
    const text = svg
      .append("g")
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
    
      //Render the simulation
    simulation.on("tick", () => {
      circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
      text.attr("x", (node) => node.x).attr("y", (node) => node.y);
      lines
        .attr("x1", (link) => link.source.x)
        .attr("y1", (link) => link.source.y)
        .attr("x2", (link) => link.target.x)
        .attr("y2", (link) => link.target.y);
    });
  }, [nodes, links]); //End of useEffect()

  return (
    <Row >
        <svg ref={svgRef}></svg>

    </Row>
  );
};

export default Network;
