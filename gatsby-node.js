const fetch = require("node-fetch");
const axios = require("axios");
const filesystem = require("fs");


const constellationIds = [
6888581,
2545621, 
85290808, 
85289148, 
8563091, 
85288342, 
9302981,
85289632,
28160043,
22314894,
14777823,
42201796,
85290220,
85290256,
45693157,
47361734,
26991682,
85311292,
85312751,
85313024,
85359969,
85361084,
17012007,
1821202,
85366734,
85366829,
10043205,
85378859,
85385027,
67118714,
85389877,
85391488,
33467654,
85392783,
85394506,
25702881,
16476689,
63882491,
73184126,
56228280,
85410868,
3442439,
20994989,
44495596,
57502540,
65278400,
85386051,
8578951,
85494329,
85501852,
35918349,
55784347,
12635601,
74118480,
286968,
33762128,
68324529,
23145759,
52062192,
43798553,
69262260,
28660463,
15248318,
21001667,
57813095,
2579218,
70079598,
12632404,
47146111,
11157948,
67558766,
41503579,
66265183,
57841013,
50646342,
53837053,
13584587,
21526822,
36928915,
67782267,
74054099,
72779524,
33984863,
44344242,
69112313,
74207550,
144438,
68531606,
23038346,
]

let constellations = []

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
const { createNode } = actions;
  console.log("(1)", "read");

  //inputs to fetch the data
  //   fetch raw data from the randomuser api
  

  // constellationIds.forEach( id =>{

  let id = 6888581;

    const fetchConstellation = () =>
      axios.put(`https://api.snaccooperative.org`, {
        "command": "read",
        "constellationid": id,
      });
    // await for results
    const res = await fetchConstellation();
    // console.log(res)
    constellations.push(res.data.constellation);


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
  // map into these results and create nodes
  constellations = constellations.map((constellation) => {
    //   // Create your node object
    const constellationNode = {
      //     // Required fields
      id: createNodeId(constellation.entityType.id),
      parent: `__SOURCE__`,
      internal: {
        type: `Constellation`, // name of the graphQL query --> allRandomUser {}
        contentDigest: createContentDigest(constellation)
      },
      children: [],

      //     // Other fields that you want to query with graphQl
      text: constellation.sources,
    };

    // add it to userNode
    constellationNode.internal.contentDigest = constellation.ark;

    // Create node with the gatsby createNode() API
    // });
    createNode(constellationNode);
  });
};
