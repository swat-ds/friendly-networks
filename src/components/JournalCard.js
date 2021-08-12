import React from "react";
import { Link } from "gatsby";
import "../assets/styles/card.scss";
import { months } from "../assets/data/globalVariables";

const parseString = require("xml2js").parseString;
// function extractDate(header) {
//   let date = {};
//   let detailedDate =
//     header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
//       "tei-title"
//     ][0]._.split(":")[0].split(",")[1];
//   detailedDate = detailedDate.split("-");
//   let beginningDate = detailedDate[0].trim().split(/\s+/);
//   let endingDate =
//     detailedDate.length > 1 ? detailedDate[1].trim().split(/\s+/) : " ";

//   let bYear = beginningDate[0] != undefined ? beginningDate[0] : " ";

//   let bMonth = beginningDate[1] != undefined ? beginningDate[1] : " ";
//   bMonth = bMonth != " " ? months[parseInt(bMonth.slice(0, -3))].abbr : " ";

//   let bDay = beginningDate[2] != undefined ? beginningDate[2] : " ";

//   let eYear = endingDate[0] != undefined ? endingDate[0] : " ";

//   let eMonth = endingDate[1] != undefined ? endingDate[1] : " ";
//   eMonth = eMonth != " " ? months[parseInt(eMonth.slice(0, -3))].abbr : " ";

//   let eDay = endingDate[2] != undefined ? endingDate[2] : " ";

//   let pieces = [bYear, bMonth, bDay, eYear, eMonth, eDay];
//   let names = ["bYear", "bMonth", "bDay", "eYear", "eMonth", "eDay"];
//   pieces.forEach((piece, index) => {
//     if (piece != " ") {
//       date[names[index]] = piece;
//     }
//   });

//   return date;
// }


const JournalCard = ({ node, index, size }) => {
  let header;
  //Variables to extract the header from the prefix
  let A = node.prefixed.indexOf("<tei-teiHeader");
  let C = "</tei-teiHeader>";
  let B = node.prefixed.indexOf("</tei-teiHeader>");
  let str = node.prefixed.substring(A, B + C.length);
  parseString(str, function (err, result) {
    header = result;
  });
  console.log(header);

  let route = "/" + node.parent.name;

  let title =
    header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0].split(",")[0] || "John Hunt Journal";

  let date =
    header["tei-teiHeader"]["tei-profileDesc"][0]["tei-creation"][0][
      "tei-date"
    ][0]._.split("-") || "";

  let detailedDate =
    header["tei-teiHeader"]["tei-fileDesc"][0]["tei-titleStmt"][0][
      "tei-title"
    ][0]._.split(":")[0].split(",")[1];

  detailedDate = detailedDate.split("-");
  let beginningDate = detailedDate[0].trim().split(/\s+/);
  let endingDate =
    detailedDate.length > 1 ? detailedDate[1].trim().split(/\s+/) : "";

  let beginningYear = beginningDate[0] != undefined ? beginningDate[0] : "" ;

  let beginningMonth = beginningDate[1] != undefined ? beginningDate[1] : "";
  beginningMonth = beginningMonth !=undefined ? parseInt(beginningMonth.slice(0, -3)) :''
  // beginningMonth = beginningMonth != ""? months[parseInt(beginningMonth)].abbr : "";
  let beginningDay =
    beginningDate[2] != undefined ? beginningDate[2] : "";

  let endingYear = endingDate[0] != undefined ? endingDate[0] : "";
  let endingMonth = endingDate[1] != undefined ? endingDate[1] : "" ;
  endingMonth =endingMonth != undefined ? endingMonth.slice(0, -3) : "";
  let endingDay = endingDate[2] != undefined ? endingDate[2] : "" ;

  let text =
    header["tei-teiHeader"]["tei-fileDesc"][0]["tei-seriesStmt"][0][
      "tei-title"
    ][0]["tei-title"][1]._ || "";

  return (
    <Link className="g-link" to={route}>
      <div className="card journal-card">
        <div className="card-body">
          <h5 className="card-title">
            {`${title}`}
            <br />
            <br />
            <small>from</small>
            <br />
            <br />
          </h5>
          <p className="card-subtitle mb-2">
            {/* `{}` */}
            {beginningMonth ? <span>{`${months[beginningMonth-1].abbr} `}</span> : ""}
            {beginningDay ? <span>{`${beginningDay}, `}</span> : ""}
            {beginningYear ? <span>{`${beginningYear}`}</span> : ""}

            {endingYear ? <span>{` to `}</span> : ""}

            {endingMonth ? <span>{`${months[endingMonth-1].abbr} `}</span> : ""}
            {endingDay ? <span>{`${endingDay}, `}</span> : ""}
            {endingYear ? <span>{`${endingYear}`}</span> : ""}
            {/* {`${beginningMonth} ${beginningDay}, ${beginningYear} to ${endingMonth} ${endingDay}, ${endingYear}`} */}
          </p>
          <p className="card-text">{text}</p>
          <p className="text-muted">{`${index} out of ${size}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard;
