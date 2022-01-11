import React from "react";
import Layout from "../components/Layout";
import Network from "../components/Network";
import { graphql } from "gatsby";
// const fs = require('fs')
// const nodes = require("../assets/data/dataTable.json");
// const links = require("../assets/data/relationshipTable.json");

// let d3Nodes = [];
// let d3Links = [];

/**
 *
 *
  {
    "id": "w6tq8ftp",
    "label": "Buzby, Hannah Warrington, 1734-1819",
    "Gender": "Female",
    "Occupations": "Quakers",
    "Subjects": "Quakers;Society of Friends",
    "Monthly Meeting": "Burlington Monthly Meeting (Society of Friends : 1678-1827)"
  },
 */
const createD3Nodes = (constellations) => {
  let d3Nodes = [];
  //Insert the relatives to the nodes and construct the links

  for (const constellation of constellations) {
    let node = {
      id: constellation.arkId || null,
      label: constellation.nameEntries[0].original || null,
      gender: constellation.genders ? constellation.genders[0].term.term : null,
      degree: constellation.mentions,
      occupations:
        constellation.occupations?.reduce((labels, occupation) => {
          let occupationLabel = occupation.term?.term
            ? occupation.term.term + "; "
            : "";
          return labels + occupationLabel;
        }, "") || null, ///=> label; lable2; lable3
      subjects:
        constellation.subjects?.reduce((labels, subject) => {
          let subjectLabel = subject.term?.term ? subject.term.term + "; " : "";
          return labels + subjectLabel;
        }, "") || null, ///=> label; lable2; lable3
    };

    if (node.id != null) {
      d3Nodes.push(node);
    }
  }
  return d3Nodes;
};

/**
 *   { "source": "w6tq8ftp", "label": "spouseOf", "target": "w6qj854r" },
 * @returns
 */
const createD3Links = (source, target, label) => {
  const link = {
    source: source,
    label: label,
    target: target,
  };

  return link;
};

const network = ({ data }) => {
  let d3Nodes = [];
  let d3Links = [];

  let constellations = data.allConstellation.nodes;
  console.log("Size of entities:", constellations.length);
  let arkIds = [];
  constellations
    .forEach((c) => arkIds.push(c.arkId));
  console.log("arkIds: ", arkIds);

  d3Nodes.push(...createD3Nodes(constellations));
  console.log("D3 nodes created:", d3Nodes);

  for (const node of constellations) {
    let relations = node.relations ? node.relations : [];
    for (const relation of relations) {
      let target = relation.targetArkID.split("/").pop() || null;
      let label = relation.type?.term || null;
      let hasTargetAvailable = arkIds.includes(target);
      if (hasTargetAvailable) {
        d3Links.push(createD3Links(node.arkId, target, label));
      }
    }
  }

  return (
    <Layout>
      {/* <Vis nodesInJSON={d3Nodes} linksInJSON={d3Links}></Vis> */}
      <Network
        nodesInJSON={d3Nodes}
        linksInJSON={d3Links}
        centralFigure="w6n9820p"
      ></Network>
    </Layout>
  );
};

export default network;

export const query = graphql`
  {
    allConstellation {
      nodes {
        id
        arkId
        mentions
        nameEntries {
          original
          components {
            dataType
            id
            order
            text
            type {
              term
            }
          }
          id
        }
        occupations {
          term {
            term
          }
        }
        subjects {
          term {
            term
          }
        }
        entityType {
          term
        }
        biogHists {
          language {
            language {
              term
              description
            }
          }
          text
        }
        places {
          confirmed
          original
          note
          geoplace {
            administrationCode
            countryCode
            id
            latitude
            longitude
            name
            uri
          }
        }
        relations {
          sourceArkID
          targetArkID
          sourceConstellation
          targetConstellation

          type {
            term
          }
          content
          note
          id
        }
        sameAsRelations {
          uri
        }
        subjects {
          term {
            term
          }
        }
        genders {
          term {
            term
            type
          }
        }
        dates {
          fromDate
          fromDateOriginal
          toDate
          toDateOriginal
        }
      }
    }
  }
`;
