import React from 'react'
import Layout from '../components/Layout'
import Network from "../components/Network";

const nodes = require("../assets/data/dataTable.json");
const links = require("../assets/data/relationshipTable.json");

const network = () => {
    return (
      <Layout>
        <Network
          nodesInJSON={nodes}
          linksInJSON={links}
          centralFigure="w6n9820p"
        ></Network>
      </Layout>
    );
}

export default network
