import React from 'react'
import Layout from '../components/Layout'
import Network from "../components/Network";
import {graphql} from 'gatsby'
// const fs = require('fs')
// const nodes = require("../assets/data/dataTable.json");
// const links = require("../assets/data/relationshipTable.json");

let d3Nodes = [];
let d3Links = [];

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

  for(const constellation of constellations){

    let node = {
      id: constellation.arkId || null,
      label: constellation.nameEntries[0].original || null,
      gender: constellation.genders? constellation.genders[0].term.term : null,
      occupations: constellation.occupations?.reduce((labels, occupation)=>{
        let occupationLabel = occupation.term?.term ? occupation.term.term + "; " : "";
        return labels + occupationLabel;
      }, '') || null ///=> label; lable2; lable3
    };

    if(node.id != null){
      d3Nodes.push(node);
    }
  }
  return d3Nodes;
};

/**
 *   { "source": "w6tq8ftp", "label": "spouseOf", "target": "w6qj854r" },
 * @returns 
 */
const createD3Links = (source, target, label ) => {
  const link = {
    source: source,
    label: label,
    target: target,
  };

  return link;
};

function isTargetInIds(arkIds, target){
  return arkIds.includes(target);
}

const network = ({data}) => {

  let constellations = data.allConstellation.nodes;
  console.log("Size of entities:", constellations.length)
  let arkIds = [];
  constellations.forEach(c => arkIds.push(c.arkId))
  console.log("arkIds: ", arkIds)

  d3Nodes.push(...createD3Nodes(constellations));
  console.log("D3 nodes created:", d3Nodes)

  for (const node of constellations) {
    let relations = node.relations || [];
    for (const relation of relations) {
      let target = relation.targetArkID.split("/").pop() || null;
      let  label=  relation.type.term || null;
      let hasTargetAvailable = (arkIds.includes(target));
        if (hasTargetAvailable) {
          d3Links.push(createD3Links(node.arkId, target, label));
        }
    }
  }
console.log("d3Links created: ", d3Links)

// let sourceNotInNodes =[]
// let targetNotInNodes = [];

//  for (let index = 0; index < d3Links.length; index++) {
//    let sourceFound = false;
//    loop2: for(let node = 0; node < d3Nodes.length; node++){
//      if(d3Links[index].source  == d3Nodes[node].id){
//        sourceFound = true;
//       //  console.log(`Found it: ${d3Links[index].source} => ${d3Nodes[node].id}`);
//        break loop2;
//      }
//    }
//     if (sourceFound == false) {
//       // console.log(`${d3Links[index].source} is not in any of the node ids`);
//       sourceNotInNodes.push(d3Links[index].source);
//     }
//  }

//  console.log("source not found:" ,sourceNotInNodes)

//  let removableIndices = []
//  let removableLinks = []
//   for (let index = 0; index < d3Links.length; index++) {
//     let targetFound = false;
//     loop2: for (let node = 0; node < d3Nodes.length; node++) {
//       if (d3Links[index].target == d3Nodes[node].id) {
//         targetFound = true;
//         //  console.log(`Found it: ${d3Links[index].source} => ${d3Nodes[node].id}`);
//         break loop2;
//       }
//     }
//     if (targetFound == false) {
//       // console.log(`For source ${d3Links[index].source}: ${d3Links[index].target} is not found`);
//       removableLinks.push(d3Links[index])
//       removableIndices.push(index);
//     }
//   }
//  console.log("removable links", removableLinks);
//  console.log("removable indices", removableIndices);
 
//  let  i = 0
    // for (let index = 0; index < d3Links.length; index++) {
    //   let targetFound = false;
    //   loop2: for (let node = 0; node < d3Nodes.length; node++) {
    //     if (d3Links[index].target == d3Nodes[node].id) {
    //       targetFound = true;
    //       //  console.log(`Found it: ${d3Links[index].source} => ${d3Nodes[node].id}`);
    //       break loop2;
    //     }
    //   }
    //   if (targetFound == false) {
    //     i++;
    //     console.log(`For source ${d3Links[index].source}: ${d3Links[index].target} is not found`);
    //     // d3Links.splice(index, 1);
    //   }
    // }


    return (
      <Layout>
        <Network
          nodesInJSON={d3Nodes}
          linksInJSON={d3Links}
          centralFigure="w6n9820p"
        ></Network>
      </Layout>
    );
}

export default network


export const query = graphql`
  {
    allConstellation {
      nodes {
        id
        arkId
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

