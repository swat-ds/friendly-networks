import React from "react";
import { graphql, Link } from "gatsby";
import { Table } from "react-bootstrap";
import "../styles/entity.scss";


const RelationCardDeck = ({ relationDeck }) => {


  const renderEntityRow = (relation, index) => {

    let type = "unknown";
    let note = "unknown";
    let name = "unknown";
    let date = "unknown";
    let arkId = "";
    if ("note" in relation) {
      note = relation.note;
    }
    let content = "";
    if (relation) {
      type = relation.type?.term ? relation.type?.term : type;
      content = relation.content ? relation.content : content;
      arkId = relation.targetArkID.split("/").pop();
      if (content !== "unknown") {
        content = content.split(",");
        date = content.pop();
        name = content.join(",");
      }
    }

    return (
      <tr>
        <td>{date}</td>
        <td>
            <Link className="g-link" to={"/entities/" + arkId}>{name}</Link>
        </td>
        <td>{type}</td>
        <td>{note}</td>
      </tr>
    );
  };


  return (
        <Table striped bordered hover
          style={{color:"var(--bs-secondary)", borderColor:"var(--bs-secondary)"}}
        >
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Relation Type</th>
              <th scope="col">Note</th>
              {/* <th scope="col">Link</th> */}
            </tr>
          </thead>
          <tbody>
            {relationDeck.map(renderEntityRow)}
          </tbody>
        </Table>
  );
};

export default RelationCardDeck;

export const query = graphql`
 {
   allConstellation {
     nodes {
       id
       arkId
       imageSrc
       entityType {
         term
       }
       nameEntries {
         original
       }
       genders {
         term {
           term
         }
       }
       occupations {
         term {
           term
         }
       }
     }
   }
 }
`;
