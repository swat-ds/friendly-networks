import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#808B42",
  },
};


const Vis = ({nodesInJSON, linksInJSON}) => {
  
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: nodesInJSON,
      edges: linksInJSON,
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log(nodes);
      },
    },
  });
  const { graph, events } = state;
  return (
    <div>
      <h1>React graph vis</h1>
      <p>
        <a href="https://github.com/crubier/react-graph-vis">Github</a> -{" "}
        <a href="https://www.npmjs.com/package/react-graph-vis">NPM</a>
      </p>
      <p>
        <a href="https://github.com/crubier/react-graph-vis/tree/master/example/src/index.js">
          Source of this page
        </a>
      </p>
      <p>A React component to display beautiful network graphs using vis.js</p>
      <p>
        Make sure to visit <a href="http://visjs.org">visjs.org</a> for more
        info.
      </p>
      <p>This package allows to render network graphs using vis.js.</p>
      <p>Rendered graphs are scrollable, zoomable, retina ready, dynamic</p>
      <p>
        In this example, we manage state with react: on double click we create a
        new node, and on select we display an alert.
      </p>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "640px" }}
      />
    </div>
  );
};

export default Vis;
