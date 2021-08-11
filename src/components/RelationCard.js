import React from 'react'
import {Link} from 'gatsby'
import {Card, Col} from 'react-bootstrap'
import "../assets/styles/styles.scss";
import "../assets/styles/card.scss";

/**
 * Creates a bootstrap card for each of the @relation. Each card contains some brief info about the
 * entity, including the name, date, etc.
 * @param {*} relation the relation to be put in the card
 * @returns a react card, wrapped with a GatsbyJS Link
 */
const RelationCard = ({relation, index, size }) => {
  console.log(relation)

  let arkId = relation.targetArkID.split("/").pop();
  console.log(arkId)

    let type='';
    let content = ''
    if(relation){
        type = relation.type?.term ? relation.type?.term : type
        content = relation.content ? relation.content : content;
    }
    return (
      <Link to={"/entities/" + arkId}>
        <div className="card relative-card">
          <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <h6 className="card-subtitle mb-2">Card subtitle</h6>
            <p className="card-text">{content}</p>
            <p className="text-muted">{`${index + 1} out of ${size}`}</p>
          </div>
        </div>
      </Link>
    );
}
export default RelationCard;
