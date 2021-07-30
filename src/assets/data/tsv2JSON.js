//var tsv is the TSV file with headers
const fs = require("fs");
const tsvNodes = fs.readFileSync("./dataTable.tsv", "utf8");
const tsvLinks = fs.readFileSync("./relationshipTable.tsv", "utf8");


function tsvJSON(tsv) {
  var lines = tsv.split("\n");

  var result = [];

  var headers = lines[0].split("\t");

  for (var i = 1; i < lines.length-1; i++) {
    var obj = {};
    var currentline = lines[i].split("\t");

    for (var j = 0; j < headers.length-1; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}
const jsonNodes = tsvJSON(tsvNodes);
const jsonLinks = tsvJSON(tsvLinks);


console.log(jsonNodes.length)
console.log(jsonLinks.length);

fs.writeFileSync("dataTable.json", jsonNodes, (err) =>{
    if(err) throw err;
})

fs.writeFileSync("relationshipTable.json", jsonLinks, (err) => {
  if (err) throw err;
});