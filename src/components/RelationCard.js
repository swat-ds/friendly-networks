import React from 'react'
import {Link} from 'gatsby'
import {Card, Col, Button} from 'react-bootstrap'
import "../assets/styles/styles.scss";
import "../assets/styles/card.scss";
import {BsBoxArrowRight} from 'react-icons/bs'

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
      <Link className="g-link" to={"/entities/" + arkId}>
        <div className="card relative-card">
          <div className="card-body">
            <h5 className="card-title" style={{ textDecoration: "none" }}>
              {type}
            </h5>
            <hr class="card-hr" />
            <h6 className="card-subtitle mb-2">Card subtitle</h6>
            <p className="card-text">{content}</p>
            <div className="card-footer">
              <small
                id="entity-card-footer-index"
                className="text-muted"
              >{`${index} out of ${size}`}</small>
              <Button variant="outline-success">
                <BsBoxArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
}
export default RelationCard;
