import React from "react";
import { useRef, useState, useEffect, useLayoutEffect, useMemo } from "react";
import * as d3 from "d3";
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  ToggleButton,
  Popover,
} from "react-bootstrap";
// import "../assets/styles/styles.scss";
import "../styles/network.scss";

/**
 *
 * @param {*} nodesInJSON A json array contains multiple nodes as object
 * @param {*} linksInJSON A json array contains multiple link as object
 * @param {*} centralFigure An indication of whose entity is rendered
 *
 * Note: all of the above @params are destructured from  @props @param
 * @returns a @Row element containing an svg
 */

function getNodesWithoutHunt(nodes, links, removingNode) {
   let filteredNodes = nodes.filter((node) => {
     return node.id !== removingNode;
   });

   let filteredLinks = links.filter((link) => {
     return (
       (link.source.id !== removingNode) & (link.target.id !== removingNode)
     );
   });
  return {
    filteredNodes: filteredNodes,
    filteredLinks: filteredLinks
  };
}

const Network = ({ nodesInJSON, linksInJSON, centralFigure }) => {
  //states to changes nodes and links if needed

 const { filteredNodes, filteredLinks } = useMemo(() => {
   return getNodesWithoutHunt(nodesInJSON, linksInJSON, centralFigure);
 }, [centralFigure]);

  //  console.log("nodes in json length:", nodesInJSON.length);
  //   console.log("links in json length:", linksInJSON.length);
  //   console.log("no Hunt nodes length:", noHuntNodes.length);
  //   console.log("no Hunt links :", noHuntLinks.length);

  const [nodes, setNodes] = useState(nodesInJSON);

  const [links, setLinks] = useState(linksInJSON);
  const [removeHunt, setRemoveHunt] = useState(false);

  useEffect(() => {
    if (removeHunt) {
      let filteredNodes = nodesInJSON.filter((node) => {
        return node.id !== centralFigure;
      });

      let filteredLinks = linksInJSON.filter((link) => {
        return (
          (link.source.id !== centralFigure) &
          (link.target.id !== centralFigure)
        );
      });
      setNodes(filteredNodes);
      setLinks(filteredLinks);
      console.log("filtered Nodes length:", filteredNodes.length);
      console.log("filtered Links length:", filteredLinks.length);
    } else {
      setNodes(nodesInJSON);
      setLinks(linksInJSON);
    }
  }, [removeHunt]);

  const svgRef = useRef(); // A reference to refer to the SVG element
  let width = 600,
    height = 800; //height of the svg

  //All the D3 data binding is inside the useEffect, will be re-rendered when nodes or links changes
  //Synonymous to componentDidMount() in the class version of the component

  function draw() {
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
      .force("charge", d3.forceManyBody().strength(-2300))
      .force("collide", d3.forceCollide().radius(90).iterations(2))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(50)
          .id((node) => node.id)
      )
      .force("center", d3.forceCenter(width / 2, height / 2));

    //Feature to make the force directed graph draggable
    const dragInteraction = d3.drag().on("drag", (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(0.2);
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
        return link.label == "acquaintanceOf" ||
          link.label == "correspondedWith" ||
          link.label == "associatedWith"
          ? "#03AC93"
          : "#A7026A"; //purple
      })
      .attr("stroke-width", (link) => {
        if (
          link.label == "acquaintanceOf" ||
          link.label == "correspondedWith" ||
          link.label == "associatedWith"
        ) {
          return 4;
        }
        return 2;
      });
    // .style("stroke-dasharray", "3, 3");

    //Bind a circle to each node
    const nodeWrapper = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "nodeWrapper");

    const circles = nodeWrapper
      .append("circle")
      .attr("class", "node")
      .attr("r", (node) => {
        //John Hunt has 2 records;
        const radius = Math.log(node.degree + 1) * 10 + 20;
        return node.id == centralFigure ? 60 : radius //Accentuates the centralFigure with bigger radius
      })
      .call(dragInteraction)
      // .style("stroke", "#bd0fdb")
      // .style("stroke-width", 1)
      .style("fill", (node) => {
        if (node.id == centralFigure) return "#FF8C00";
        if (node.subjects?.includes("ministry")) {
          return "#505A34";
        }
        return "#034d81";
      });

    const tooltip = d3
      .select("#mainContainer")
      .append("div")
      .classed("tooltip", true)
      .classed("general-text", true)
      .attr("id", "node-tooltip")
      .style("opacity", 0); //

    nodeWrapper.on("mouseover", function (event, d) {
      tooltip.transition().duration(300).style("opacity", 1); // show the tooltip
      tooltip
        .html(d.label)
        .style(
          "left",
          event.pageX - d3.select(".tooltip").node().offsetWidth - 5 + "px"
        )
        .style(
          "top",
          event.pageY - d3.select(".tooltip").node().offsetHeight + "px"
        );

      // button.transition().duration(300).style("opacity", 1); // show the tooltip
      // button
      //   .html("click")
    });

    nodeWrapper.on("mouseleave", (event, d) => {
      tooltip.transition().duration(1000).style("opacity", 0); //
    });

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
      })
      .style("fill", "#9bc9c9");

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
    return svg;
  }
  useEffect(() => {
    const svg = draw();
    return () => {
      svg.remove();
    };
  }, [nodes, links, removeHunt]); //End of useEffect()

  // function removeCenter(){
  //   setRemoveHunt(!removeHunt)
  //   console.log(nodes.length, links.length)

  //   let filteredNodes = nodesInJSON.filter((node) => {
  //        return node.id !== centralFigure;
  //   });

  //   let filteredLinks = linksInJSON.filter(link => {
  //     return link.source.id !== centralFigure && link.target.id !== centralFigure;
  //   });
  //   setNodes(filteredNodes)
  //   setLinks(filteredLinks);
  //   console.log(filteredNodes.length, filteredLinks.length);
  // }

  const [highli, sethighli] = useState(initialState)
  return (
    <>
      <Row id="main-row">
        <Col>
          <Button
            variant={removeHunt ? "success" : "danger"}
            onClick={() => setRemoveHunt(!removeHunt)}
            style={{ margin: "2px" }}
          >
            <span className="general-text">
              {removeHunt ? "Add Hunt" : "Remove Hunt"}
            </span>
          </Button>
          
        </Col>
        <Col>
          <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>

    <label class="form-check-label general-text" for="flexSwitchCheckDefault">Highlight ministers</label>
  </div>
        </Col>
        <Col>
          {/* return "#505A34";
        }
        return "#034d81"; */}
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "#505A34",
            }}
          ></div>
          <span className="general-text">Ministers</span>
        </Col>
        <Col>
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "#034d81",
            }}
          ></div>
          <span className="general-text">Other</span>
        </Col>

        <Col>
          <div
            style={{
              height: "5px",
              width: "30px",
              backgroundColor: "#A7026A",
            }}
          ></div>
          <span className="general-text">Family Relations</span>
        </Col>

        <Col>
          <div
            style={{
              height: "5px",
              width: "30px",
              backgroundColor: "#03AC93",
            }}
          ></div>
          <span className="general-text">Acquaintances, Associated With </span>
        </Col>
      </Row>
      <Row>
        <Col id="mainContainer">
          <svg
            style={{ backgroundColor: "#342E37" }}
            id="network-svg"
            ref={svgRef}
          ></svg>
        </Col>
      </Row>
    </>
  );
};

export default Network;
