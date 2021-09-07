import React from "react";
import { useState } from "react";
import { Link, graphql } from "gatsby";
import { Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import "../assets/styles/entity.scss";
import EntityCard from "./EntityCard";


const EntityCardDeck = ({entityDeck}) => {

  // Sort Objects Numerically

  entityDeck.sort( (a, b) => a.nameEntries[0].original > b.nameEntries[0].original?  1: -1);

  // Sort Objects Alphabetically

  // const renderCard = (Card, index) => {
  //   return (
  //     <Col style={{ border: "0.1px solid gray" }}>
  //       <EntityCard
  //         entity={Card}
  //         index={index}
  //         size={entityDeck.length}
  //       ></EntityCard>
  //     </Col>
  //   );
  // };

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
       <tr scope="row">
         <td>{date}</td>
         <td>
           <Link className="g-link" to={"/entities/" + entity.arkId}>
             {name}
           </Link>
         </td>
         <td>
           <a href="#" class="more">
             SNACC Link
           </a>
         </td>
       </tr>
     );
   };


  return (
    <Row  id="main-row">
      <div class="table-responsive">
        <table class="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">External Source</th>
            </tr>
          </thead>
          <tbody>{entityDeck.map(renderEntityRow)}</tbody>
        </table>
      </div>
    </Row>
  );
};

export default EntityCardDeck;
