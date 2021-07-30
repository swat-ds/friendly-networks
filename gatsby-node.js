const axios = require("axios");
const apiData = require("./src/assets/data/ids_arks.json");
const component = require.resolve(`./src/components/People.js`);

const constellationData = apiData.ids_arks;

let constellations = [];

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  console.log("(1)", "read");

  //fetch the data

  for (const i of constellationData) {
    const fetchConstellation = () =>
      axios.put(`https://api.snaccooperative.org`, {
        command: "read",
        constellationid: i.id,
      });

    constellations.push(await fetchConstellation());
  }


console.log(constellations.length)

  //Assumed data is retrieved
  console.log("(2)", "retrieved");
  let i = 0;
  for (const c of constellations) {
    const { constellation } = c.data
    const constNode = {
      //     // Required fields
      id: `${constellationData[i].id}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Constellation`, // name of the graphQL query --> allRandomUser {}
        //       // contentDigest will be added just after
        //       // but it is required
      },
      children: [],

      //     // Other fields that you want to query with graphQl
      ark: constellation.ark,
      entityType: constellation.entityType,
      sources: constellation.sources,
      nameEntries: constellation.nameEntries,
      occupations: constellation.occupations,
      biogHists: constellation.biogHists,
      relations: constellation.relations,
      sameAsRelations: constellation.sameAsRelations,
      resourceRelations: constellation.resourceRelations,
      places: constellation.places,
      subjects: constellation.subjects,
      genders: constellation.genders,
      dates: constellation.dates,

    };

    // add it to userNode
    constNode.internal.contentDigest = c.data.constellation.ark;

    // Create node with the gatsby createNode() API
    // });
    createNode(constNode);
    i++;
  }

  return;
};




//Create pages for each entity, depends on the creation of entity nodes above
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  

  const result = await graphql(`
    query Constellations {
      allConstellation {
        nodes {
          id
          ark
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
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  for (const node of result.data.allConstellation.nodes) {
    createPage({
      path: `entities/${node.id}`,
      component,
      context: {
        id: node.id,
        ark: node.ark,
        nameEntries: node.nameEntries,
        occupations: node.occupations,
        entityType: node.entityType,
        biogHists: node.biogHists,
        places: node.places,
        relations: node.relations,
        sameAsRelations: node.sameAsRelations,
        resourceRelations: node.resourceRelations,
        subjects: node.subjects,
        genders: node.genders,
        dates: node.dates,
      },
    });
  }
};
