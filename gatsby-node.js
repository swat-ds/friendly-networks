const axios = require("axios");
const constellationData = require("./content/constellationsForInclusion.json");
const PeopleComponent = require.resolve(`./src/components/Person.js`);
const bgComponent = require.resolve(`./src/templates/BgComponent.js`);

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

//Creates nodes for the markdown, which are used later to create pages.
exports.onCreateNode = ({ node, getNode, actions }) => {
  //called when node created/updated
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      //adds slug to pages graphql query -> allMarkdownRemark { edges { node { fields { slug }}}}
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// Pull in constellation data and add to GraphQL
let constellations = [];
exports.sourceNodes = async ({actions,createNodeId, createContentDigest}) => {
  const { createNode } = actions;
  console.log("(1)", "read");

  //fetch the data
  let x = 0;
  for (const i of constellationData) {
    const fetchConstellation = () =>
      axios.get(`https://api.snaccooperative.org`, {
        data: {
          command: "read",
          constellationid: i["SNAC ID"],
        },
        // timeout: 10000,
      });
      let result = await fetchConstellation()
      if("constellation" in result.data){
        x++;
        constellations.push(result);
      }
  }

  console.log(constellations.length)
  console.log(x);

  //Assumed data is retrieved
  console.log("(2)", "retrieved");
  let i = 0;
  constellations.forEach(c => {
    const { constellation } = c.data
    const constNode = {
      //     // Required fields
      id: `${constellationData[i]["SNAC ID"]}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Constellation`, // name of the graphQL query --> allRandomUser {}
        //       // contentDigest will be added just after
        //       // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      arkId: constellation.ark.split("/").pop() || null,
      triCoID: constellationData[i]["TriCo ID"] || null,
      mentions: parseInt(constellationData[i]["Mntns"]) || 0,
      imageSrc: constellationData[i]["ImgSrc"] || null,
      entityType: constellation.entityType || null,
      sources: constellation.sources || null,
      nameEntries: constellation.nameEntries || null,
      occupations: constellation.occupations || null,
      biogHists: constellation.biogHists || null,
      relations: constellation.relations || null,
      sameAsRelations: constellation.sameAsRelations || null,
      resourceRelations: constellation.resourceRelations || null,
      places: constellation.places || null,
      subjects: constellation.subjects || null,
      genders: constellation.genders || null,
      dates: constellation.dates || null,
    };

    // add it to userNode
    constNode.internal.contentDigest = c.data.constellation.ark;

    // Create node with the gatsby createNode() API
    // });
    createNode(constNode);
    i++;
  })

  return;
};


//Create pages for each entity, depends on the creation of entity nodes above
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;


  const result = await graphql(`
    query Constellations {
      allCetei {
        nodes {
          prefixed
          elements
          parent {
            ... on File {
              name
            }
          }
        }
      }
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
            role {
              term
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
            fromType {
                term
            }
            toDate
            toDateOriginal
            toType {
                term
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  /////////// Create entity pages ///////////

  let arks = []
  for (const node of result.data.allConstellation.nodes){
    arks.push(node.arkId);
  }
  console.log(arks.length);
  for (const node of result.data.allConstellation.nodes) {
    createPage({
      path: `people/${node.arkId}`,
      component: PeopleComponent,
      context: {
        id: node.id,
        arkId: node.arkId,
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
        allArks: arks,
        arkRegex: `/${node.arkId}/`,
      },
    });
  }

  /////////// Create journal pages ///////////
  const component = require.resolve(`./src/gatsby-theme-ceteicean/components/Ceteicean.tsx`)
  for (const node of result.data.allCetei.nodes) {
    const name = node.parent.name;
    createPage({
      path: "journals/" + name,
      component,
      context: {
        name,
        prefixed: node.prefixed,
        elements: node.elements
      }
    })
  }

  /////////// Create Markdown pages ///////////

  return (
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
                title
              }
              html
              rawMarkdownBody
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.slug,
          component: bgComponent,
          context: {
              body: node.html,
              rawBody: node.rawMarkdownBody,
              title: node.frontmatter.title
            }, // additional data can be passed via context
        });
      });
    })
  );
};

// // Create page for each TEI file (code from gatsby-theme-ceteicean/gatsby-node)
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
//   const component = require.resolve(`./src/gatsby-theme-ceteicean/components/Ceteicean.tsx`)
//
//   const result = await graphql(`
//     query {
//       allCetei {
//         nodes {
//           prefixed
//           elements
//           parent {
//             ... on File {
//               name
//             }
//           }
//         }
//       }
//     }
//   `)
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   for (const node of result.data.allCetei.nodes) {
//     const name = "journals/" + node.parent.name;
//     createPage({
//       path: name,
//       component,
//       context: {
//         name,
//         prefixed: node.prefixed,
//         elements: node.elements
//       }
//     })
//   }
// }
