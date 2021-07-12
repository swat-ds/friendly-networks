const axios = require("axios");
const apiData = require('./src/assets/data/ids.json')

const constellationIds = apiData.ids;

let constellations = [];

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  console.log("(1)", "read");

  //inputs to fetch the data
  //   fetch raw data from the randomuser api

  // constellationIds.forEach( id =>{
  for (const i of constellationIds) {
    const fetchConstellation = () =>
      axios.put(`https://api.snaccooperative.org`, {
        command: "read",
        constellationid: i,
      });

    constellations.push(await fetchConstellation());
  }
  const fetchConstellation = (id) =>
    axios.put(`https://api.snaccooperative.org`, {
      command: "read",
      constellationid: id,
    });
  // await for results
  // let res = await fetchConstellation(85290808);
  // console.log(res.status);
  // constellations.push(res.data.constellation);
  // res = await fetchConstellation(28160043);
  // constellations.push(res.data.constellation);
  // console.log(constellations.length);

  const getALlConstellations = async (_) => {
    console.log("Started fetching");
      for (let i = 0; i < constellationIds.length; i++) {
        const res = await fetchConstellation(constellationIds[i]);
        constellations.push(res.data.constellation);
      }
    console.log("All are fetched");
  };
  getALlConstellations();

  // //With promises
  // const allPromises = []
  // const getALlConstellations = (_) => {
  //   console.log("Started fetching")
  //   for (let i = 0; i < constellationIds.length; i++) {
  //     const res = fetchConstellation(constellationIds[i]);
  //     console.log(i)
  //     allPromises.push(res);
  //   }
  //   Promise.all(...allPromises)
  //   .then

  //   console.log("All are fetched");
  // };
  // getALlConstellations();
  // console.log(constellations.length);

  // console.log(res)

  // const options = {
  //   method: "PUT",
  //   body: {
  //     command
  //   }
  // }
  //    fetch(`https://api.snaccooperative.org`, {
  //      body: JSON.stringify(options),
  //      headers: { "Content-Type": "application/json" },
  //    })
  //      .then((response) => {
  //        console.log(response.status);
  //        constellations.push(response.data);
  //      })
  //      .catch((error) => {
  //        // Something happened in setting up the request that triggered an Error
  //        console.log("Error", error.message);
  //      });

  // })

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
      sources: c.data.constellation.sources,
      nameEntries: c.data.constellation.nameEntries,
      bioHists: c.data.constellation.bioHists,
      resourceRelations: c.data.constellation.resourceRelations,
      places: c.data.constellation.places,
      subjects: c.data.constellation.subjects,
      dates: c.data.constellation.dates,
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
