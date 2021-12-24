import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Table } from "react-bootstrap";
import "../styles/entity.scss";


const RelationCardDeck = ({ relationDeck }) => {

  const data = useStaticQuery(graphql`
    query {
      allConstellation {
        nodes {
          arkId
          nameEntries {
            original
          }
        }
      }
    }
  `);

  // Get an object w/ entries of form {arkId: name}
  const arkToNameMap = Object.assign(
    {}, ...(data.allConstellation.nodes.map(item => ({
      [item.arkId]: item.nameEntries[0].original
    }) ))
  );

  const fullRelationTags ={
    "acquaintanceOf": "Acquaintance of",
    "associatedWith": "Associated with",
    "auntOrUncleOf": "Aunt or uncle of",
    "childOf": "Child of",
    "child-in-law of": "Child-in-law of",
    "correspondedWith": "Corresponded with",
    "grandchildOf": "Grandchild of",
    "grandparentOf": "Grandparent of",
    "nieceOrNephewOf": "Niece or nephew of",
    "ownedBy": "Enslaved by",
    "ownerOf": "Enslaver of",
    "parent-in-law of": "Parent-in-law of",
    "parentOf": "Parent of",
    "relativeOf": "Relative of",
    "siblingOf": "Sibling of",
    "sibling-in-law of": "Sibling-in-law of",
    "spouseOf": "Spouse of",
  }

  const renderEntityRow = (relation, index) => {

    let type = "unknown";
    let note = "unknown";
    let name = "unknown";
    let arkId = "";
    if ("note" in relation) {
      note = relation.note;
    }
    if (relation) {
      type = relation.type?.term
        ? fullRelationTags[relation.type.term]
        : type;
      arkId = relation.targetArkID.split("/").pop();
      name = arkToNameMap[arkId];
    }

    return (
      <tr>
        <td className="rel-col">{type}</td>
        <td className="name-col">
            <Link className="g-link" to={"/entities/" + arkId}>{name}</Link>
        </td>
        <td className="note-col">{note}</td>
      </tr>
    );
  };


  return (
        <Table striped bordered id="relations-table">
          <thead>
            <tr>
              <th scope="col" className="rel-col table-header">
                Relationship
              </th>
              <th scope="col" className="name-col table-header">Name</th>
              <th scope="col" className="note-col table-header">Note</th>
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
