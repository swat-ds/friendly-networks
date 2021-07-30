/**
 * Necessary modules to parse TSV (Tab Separated Value) and convert them to valid JSON objects
 */
const fs = require("fs");
const tsvNodes = fs.readFileSync("./dataTable.tsv", "utf8");
const tsvLinks = fs.readFileSync("./relationshipTable.tsv", "utf8");


/**
 * 
 * @param {*} tsv valid TSV content that is read by the fs
 * 
 * First, splits the @tsv into am array of @lines by '\n'
 * First of the @lines is assumed to be the headers, thus splitting this line by '\t' and putting them into @headers
 * Each subsequent line is splitted into @currentLine by '\t' 
 * An object is created with elements from @currentLine and using the elements from the @headers as the keys
 * @results contain all the objects created by iterating the @lines
 * @returns a valid json object that is created from the @tsv
 * 
 */
function tsvJSON(tsv) {
  var lines = tsv.split("\n");

  var result = [];

  var headers = lines[0].split("\t");

  //Last line is ignored, it's an empty line
  for (var i = 1; i < lines.length-1; i++) {
    var obj = {};
    var currentLine = lines[i].split("\t");

    //Last header is ignored as it's empty
    for (var j = 0; j < headers.length-1; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
}
const jsonNodes = tsvJSON(tsvNodes);
const jsonLinks = tsvJSON(tsvLinks);

//Creates file 'dataTable.json' that contains the jsonNodes
fs.writeFileSync("dataTable.json", jsonNodes, (err) =>{
    if(err) throw err;
})
//Creates file 'relationshipTable.json' that contains the jsonLinks
fs.writeFileSync("relationshipTable.json", jsonLinks, (err) => {
  if (err) throw err;
});