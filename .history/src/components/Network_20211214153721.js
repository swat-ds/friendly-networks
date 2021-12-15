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
    height = 1200; //height of the svg
const svg = d3.select(svgRef.current);
  //All the D3 data binding is inside the useEffect, will be re-rendered when nodes or links changes
  //Synonymous to componentDidMount() in the class version of the component
  function draw() {
    
  }
  useEffect(() => {
    const svg = draw();
    // return () => {
    //   svg.remove();
    // };
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

  return (
    <Row id="main-row">
      <Col id="mainContainer">
        <Button
          variant={removeHunt ? "success" : "danger"}
          onClick={() => setRemoveHunt(!removeHunt)}
          style={{ margin: "2px"}}
        >
          <span className="general-text">
            {removeHunt ? "Add Hunt" : "Remove Hunt"}
          </span>
        </Button>
        <svg
          style={{ backgroundColor: "#111420" }}
          id="network-svg"
          ref={svgRef}
        ></svg>
      </Col>
    </Row>
  );
};

export default Network;
