const fetch = require("node-fetch");
const axios = require("axios");
const apiData = require('./src/assets/data/ids.json')

const constellationIds = apiData.ids;

var constellations = [];

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  console.log("(1)", "read");

  //fetch the data

  for (const i of constellationIds) {
    const fetchConstellation = () =>
      axios.put(`https://api.snaccooperative.org`, {
        command: "read",
        constellationid: i,
      });

    constellations.push(await fetchConstellation());
  }

  console.log(constellations.length);

  //Assumed data is retrieved
  console.log("(2)", "retrieved");
  let i = 0;
  for (const c of constellations) {
    const constNode = {
      //     // Required fields
      id: `${constellationIds[i]}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Constellation`, // name of the graphQL query --> allRandomUser {}
        //       // contentDigest will be added just after
        //       // but it is required
      },
      children: [],

      //     // Other fields that you want to query with graphQl
      text: c.data.constellation.sources,
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
