import React from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import { navigate } from "gatsby"
import * as d3 from "d3";
import { Row, Col, Button, Card } from "react-bootstrap";
// import "../assets/styles/styles.scss";
import "../styles/network.scss";

/**
 *
 * @param {*} nodesInJSON A json array contains multiple nodes as object
 * @param {*} linksInJSON A json array contains multiple link as object
 * @param {*} centralFigures A string array of IDs of ctl figs in the network
 *
 * Note: all of the above @params are destructured from  @props @param
 * @returns a @Row element containing an svg
 */

function getGraphWithoutNode(nodes, links, exiledNode) {
  let filteredNodes = nodes.filter(node => node.id !== exiledNode);
  let filteredLinks = links.filter(link => {
      return (link.source.id !== exiledNode) & (link.target.id !== exiledNode)
  })
  return {
    nodes: filteredNodes,
    links: filteredLinks,
  };
}

const Network = ({ nodesInJSON, linksInJSON, centralFigures }) => {

  // States to track nodes and links
  const [nodes, setNodes] = useState(nodesInJSON);
  const [links, setLinks] = useState(linksInJSON);
  
  const [selectedNode, setSelectedNode] = useState(null)

  const [highlightMinister, setHighlightMinister] = useState(false);
  const [removedNodes, setRemovedNodes] = useState([]);

  const [zoomState, setZoomState] = useState(d3.zoomIdentity);

  useEffect(() => {
    let filteredGraph = removedNodes.reduce( //Assign values by
    // recursively running getGraphWithoutNode, with exile param set to
    // each value in removedNodes in succession
    (accumulator, currentValue) => {
      return getGraphWithoutNode(accumulator.nodes, accumulator.links, currentValue)
    },
    {nodes: nodesInJSON, links: linksInJSON}
    // getGraphWithoutNode is initially passed all the nodes & links that
    // were passed to Network, so that is what reduce returns 
    // if removedNodes.len === 0
    )
    setNodes(filteredGraph.nodes);
    setLinks(filteredGraph.links);
  }, [removedNodes]);


  // Map ids of central figures to last names
  const centralNames = Object.fromEntries(centralFigures.map(id => {
    return [id, nodesInJSON.find(node => node.id === id).label.split(",")[0]]
  }));

  const svgRef = useRef(); // A reference to refer to the SVG element
  let width = 600,
    height = 800; //height of the svg

  //All the D3 data binding is inside the useEffect, will be re-rendered when nodes or links changes
  //Synonymous to componentDidMount() in the class version of the component

  function draw(currZoomState) {
    console.log(zoomState);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom().on("zoom", (event) => {
          svg.attr("transform", event.transform);
          setZoomState(event.transform);
        })
      )
      .append("g");
      //'g' is an encompassing tag that groups elements inside an svg
    svg.attr("transform", currZoomState);


    //Creates a force directed graph simulation layout with nodes and links
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-800))
      .force("collide", d3.forceCollide().radius(40).iterations(8))
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(20)
          .id((node) => node.id)
      )
      .force("forceX", d3.forceX().strength(.2))
      .force("forceY", d3.forceY().strength(.2))
      .force("center", d3.forceCenter(width / 2, height / 2));

    //Feature to make the force directed graph draggable
    const dragInteraction = d3.drag().on("drag", (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(0.2);
      simulation.restart();
    });

    // Define color variables to be used in visualization
    const assocColor = "#03AC93";
    const famColor = "#A7026A";
    const offWhite = "#FAF8D6";
    const gold = "#D9B648"
    const moss = "#505A34"
    const blue = "#034d81"

    //Bind a line to each link
    const lines = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("id", function(line){
          return (line.source.id + "-" + line.target.id);
      })
      .style("stroke", (link) => {
        return link.label === "acquaintanceOf" ||
          link.label === "correspondedWith" ||
          link.label === "associatedWith"
          ? assocColor
          : famColor; //purple
      })
      // Set line width based on relationship type
      .attr("stroke-width", (link) => {
        if (
          link.label === "acquaintanceOf" ||
          link.label === "correspondedWith" ||
          link.label === "associatedWith"
        ) {
          return 3;
        }
        return 1;
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
      .attr("class", "nodeWrapper")
      // Give node a class to represent each neighbor
      .attr("class", (node) => {
          const ark = node.id;
          const tgtArray = d3.selectAll("line") // All lines
            .filter(line => line.source.id === ark) // w/ matching src
            .data() // Get data array
            .map(line => "linkedTO" + line.target.id); // get target ids

          const srcArray = d3.selectAll("line") // All lines
            .filter(line => line.target.id === ark) // w/ matching target
            .data() // Get data array
            .map(line => "linkedTO" + line.source.id); // get src ids

          // Join contents of src & tgt arrays w/ spaces; return resulting str
          return ([srcArray.join(" "), tgtArray.join(" ")].join(" "));
      })
      // Add data attributes
      .attr("data-id", (node) => node.id)
      .attr("data-label", (node) => node.label)
      .attr("data-gender", (node) => node.gender)
      .attr("data-birthDate", (node) => node.birthDate)
      .attr("data-deathDate", (node) => node.deathDate)
      .attr("data-degree", (node) => node.degree)
      .attr("data-occupations", (node) => node.occupations)
      .attr("data-subjects", (node) => node.subjects);

    // Add classes

    const circles = nodeWrapper
      .append("circle")
      .attr("class", "node")
      .attr("r", (node) => {
        const radius = Math.log(node.degree + 1) * 5 + 5;
        // Accentuate the centralFigures with bigger radii
        return centralFigures.includes(node.id) ? 35 : radius;
      })
      .call(dragInteraction)
      // .style("stroke", "#bd0fdb")
      // .style("stroke-width", 1)
      .style("fill", (node) => {
        if (centralFigures.includes(node.id)) return "#FF8C00";
        if (node.subjects?.includes("ministry")) {
          if(highlightMinister){
            return moss;
          }
        }
        return blue;
      });

      const d3Tooltip = d3
          .select("#main-container")
          .append("div")
          .attr("class", "d3Tooltip")
          .classed("general-text", true)
          .attr("id", "node-d3Tooltip")
          .style("opacity", 0);


    nodeWrapper.on("mouseover", function (event, d) {

      // show the tooltip
      d3Tooltip.transition().duration(300).style("opacity", 1);
      d3Tooltip
        .html(d.label)
        .style(
          "left",
          event.pageX - d3.select(".d3Tooltip").node().offsetWidth - 5 + "px"
        )
        .style(
          "top",
          event.pageY - d3.select(".d3Tooltip").node().offsetHeight + "px"
        );

      // Highlight hovered node
      d3.select(this)
        .style("stroke-opacity", 1.0)
        .style("stroke", gold)
        .style("stroke-width", "2px")

      // Get arkId of hovered node
      const currentArk = d3.select(this)._groups[0][0].__data__.id;

      // Highlight adjacent lines
      d3.selectAll("line")           // Get array of all lines
        .filter(function(l) {       // filter for lines w/ appropriate data
            return (
                l.source.id === currentArk ||
                l.target.id === currentArk
            );
        })
        .style("stroke", gold)  // Apply style
        .raise(); // Bring to front

      // Highlight adjacent nodes
      d3.selectAll(".linkedTO" + currentArk)
        .style("stroke-opacity", 1.0)
        .style("stroke", gold)
        .style("stroke-width", "2px");

      // button.transition().duration(300).style("opacity", 1); // show the tooltip
      // button
      //   .html("click")
    });

    nodeWrapper.on("mouseout", function (event, d) {
        // Remove highlight on current node
        d3.select(this).style("stroke-opacity", 0.0)

        // Get arkId of hovered node
        const currentArk = d3.select(this)._groups[0][0].__data__.id;

        // Restore links to normal color
        d3.selectAll("line")           // Get array of all lines
          .filter(function(l) {       // filter for lines w/ appropriate data
              return (
                  l.source.id === currentArk ||
                  l.target.id === currentArk
              );
          })
          .style("stroke", (link) => {
              return link.label === "acquaintanceOf" ||
                link.label === "correspondedWith" ||
                link.label === "associatedWith"
                ? assocColor
                : famColor; //purple
          })

        // Remove highlight on neighbors
        d3.selectAll(".linkedTO" + currentArk).style("stroke-opacity", 0.0)

    });

    nodeWrapper.on("mouseleave", (event, d) => {
      // Remove tooltip
      d3Tooltip.transition().duration(1000).style("opacity", 0);
    });

    // Click a node to pull up its information
    nodeWrapper.on("click", function (event, d) {
      // Set selectedNode useState to data of clicked node
      setSelectedNode(d3.select(this).data());
      // Prevent click from registering with svg.on("click")
      event.stopPropagation();
    });

    // Click the background to dismiss any pulled-up information
    const deselectNode = () => {
      setSelectedNode(null);
    };
    d3.select(svgRef.current).on("click", deselectNode);



    //Bind the name of each person to the corresponding node
    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "x-small")
      .style("pointer-events", "none")
      .text((node) => {
        let nameParts = node.label.split(", ");
        let lastName = nameParts[0];
        let firstName =
          nameParts.length > 2
            ? nameParts[nameParts.length - 2]
            : nameParts[nameParts.length - 1];
        let fullName = `${firstName} ${lastName}`;
        return fullName;
      })
      .style("fill", "#FBFAD8");

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
  // End of "draw" function

  // Rerender the SVG on a change
  useEffect(() => {
    const svg = draw(zoomState);
    return () => {
      svg.remove();
    };
  }, [nodes, links, removedNodes, highlightMinister]); //End of useEffect()


  function highlightMinisterHandler(e) {
    setHighlightMinister(!highlightMinister);
  }

  function addNode(node) {
    setRemovedNodes(removedNodes.concat([node]))
  }  
  function takeNode(node) {
    const index = removedNodes.indexOf(node)
    setRemovedNodes(removedNodes.toSpliced(index, 1))
  }

  
  return (
    <Row id="main-row" className="network-page">
      <Row xs={1} sm={4}>
        <Col id="network-info">
          <Row id="instructions-row">
            <h1>Social Network</h1>
            <p>The visualization below shows the relationships betwen the people
            discussed in John Hunt's journals.</p>
            <p>Thin red lines link relatives, and
            thick green lines link acquaintances.
            The larger a person's circle, the more 
            times they are mentioned in the journals.</p>
            <p>To zoom in or out, scroll while your cursor is over the visualization.
            To pan, click on the visualization background and drag your cursor.
            Hover over a node to highlight it and the connected nodes.</p>
            <p>Click a node to display its biographical profile.
            Click and drag a node to reposition it.
            The node will stay fixed in this position until you refresh the page.</p>
          </Row>
          <Row id="legend-row">
            {centralFigures.map(id => { return (
              <Col>
                <Button
                  variant={removedNodes.includes(id) ? "primary" : "danger"}
                  onClick={()=>removedNodes.includes(id)?takeNode(id):addNode(id)}
                >
                  {removedNodes.includes(id)
                    ? `Add ${centralNames[id]}` 
                    : `Remove ${centralNames[id]}`}
                </Button>
              </Col>)})
            }
            <Col>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={highlightMinisterHandler}
                />

                <label
                  className="form-check-label general-text"
                  for="flexSwitchCheckDefault"
                >
                  Highlight ministers
                </label>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  height: "5px",
                  width: "30px",
                  backgroundColor: "#A7026A",
                }}
              />
              <span className="general-text">Relatives</span>
            </Col>
            <Col>
              <div
                style={{
                  height: "5px",
                  width: "30px",
                  backgroundColor: "#03AC93",
                }}
              ></div>
              <span className="general-text">Acquaintances</span>
            </Col>
            <Col>
            <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "#034d81",
            }}
            />
            <span className="general-text">Other</span>
            </Col>
            <Col style={highlightMinister ? {} : {display: "none"}}>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#505A34",
                }}
              />
              <span className="general-text">
                Ministers
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row id="container-row" xs={1} sm={4}>
        <Col id="main-container">
          <svg
            style={{ backgroundColor: "#342E37" }}
            id="network-svg"
            ref={svgRef}
          ></svg>
        </Col>
        <Col id="info-box">
          <Card bg="primary" id="info-card">
            <Card.Body
              id="inactive-text"
              style={selectedNode ? {display: "none"} : {}}
            >
              <Card.Text>
                Click on a person's node to display their biographical details.
              </Card.Text>
            </Card.Body>
            <Card.Body style={selectedNode ? {} : {display: "none"}}>
              <Card.Title>
                { // Get name
                  selectedNode?.[0]?.label.split(",")
                    .slice(0,2).reverse().join(" ")
                }
              </Card.Title>
              <Card.Subtitle>
                {selectedNode?.[0]?.label.split(",").pop()}
              </Card.Subtitle>
              <Card.Text id="bio-snippet">
                {selectedNode?.[0]?.bio}
            </Card.Text>
            </Card.Body>
            <Card.Footer style={selectedNode ? {} :{display: "none"} }>
              <Button
                variant="info"
                size="lg"
                id="to-profile"
                role="link"
                onClick = {()=>{navigate("/people/" + selectedNode?.[0]?.id)}}
                disabled={selectedNode ? false : true}
              >
              Go to profile
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Row>
  );
};

export default Network;
