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
const RelativeCard = ({ relation }) => {
    let type='';
    let content = ''
    if(relation){
        type = relation.type?.term ? relation.type?.term : type
        content = relation.content ? relation.content : content;
    }
    return (
      <Col>
        <Link to={"/entities/" + relation.id}>
          <Card
            bsPrefix="card entity-card"
            bg="secondary"
            border="warning"
            style={{ width: "18rem", color: "white" }}
            className="mb-2"
          >
            <Card.Header>{type}</Card.Header>
            <Card.Body>
              <Card.Title>{content}</Card.Title>
              <Card.Text>This person is related</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
}

export default RelativeCard
