import React from "react";
import { Link } from "gatsby";
import { Row, Table } from "react-bootstrap";
import "../styles/entity.scss";


const EntityCardDeck = ({entityDeck}) => {

  // Sort Objects Numerically

  entityDeck.sort( (a, b) => a.nameEntries[0].original > b.nameEntries[0].original?  1: -1);

  // Sort Objects Alphabetically

   const renderEntityRow = (entity, index) => {

  let name = "unknown";
  let date = "unknown";

  if ("nameEntries" in entity) {
    let entries = entity.nameEntries[0].original.split(",");
    if (entity.entityType.term === "person") {
      date = entries.pop();
      name = entries.join(",");
    } else {
      name = "Corporate Body";
    }
  }

     return (
       <tr>
         <td>
           <Link className="g-link" to={"/entities/" + entity.arkId}>
           {name}
           </Link>
         </td>
         <td>{date}</td>
       </tr>
     );
   };


  return (
    <Row  id="main-row">
      <div class="table-responsive">
        <table class="table table-striped custom-table">
          <thead>
            <tr>
            <th scope="col">Name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{entityDeck.map(renderEntityRow)}</tbody>
        </table>
       </div>
     </Row>
  );
};

export default EntityCardDeck;
