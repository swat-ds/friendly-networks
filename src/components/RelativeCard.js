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
const RelativeCard = ({relative, index, size, className }) => {
    let type='';
    let content = ''
    if(relative){
        type = relative.type?.term ? relative.type?.term : type
        content = relative.content ? relative.content : content;
    }
    return (
      <Link to={"/entities/" + relative.targetConstellation}>
        <div className={className}>
          <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">{content}</p>
            <p>{`${index + 1} out of ${size}`}</p>
          </div>
        </div>
      </Link>
    );
}

export default RelativeCard;
