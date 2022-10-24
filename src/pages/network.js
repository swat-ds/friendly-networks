import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
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
      occupations: //=> label; lable2; lable3
        constellation.occupations?.map(occupation => occupation.term?.term)
          .filter(item => item) // filter out null values
          .join("; "),
      subjects: //=> label; lable2; lable3
        constellation.subjects?.map(subject => subject.term?.term)
          .filter(item => item) // filter out null values
          .join("; "),
      bio:
        constellation?.biogHists?.[0]?.text
          .replaceAll(/<citation.*?>/g, "\nSource: ")
          .replaceAll(/<.+?>/g, "")
          .replaceAll(/WorldCat record id:.*/g, "")
          .replaceAll(/&amp;/g, "and")
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
  // console.log("Size of entities:", constellations.length);
  let arkIds = [];
  constellations
    .forEach((c) => arkIds.push(c.arkId));

  d3Nodes.push(...createD3Nodes(constellations));

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
      <Network
        nodesInJSON={d3Nodes}
        linksInJSON={d3Links}
        centralFigure="w6n9820p"
      ></Network>
    </Layout>
  );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="Social Network - Friendly Networks"/>
)

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
