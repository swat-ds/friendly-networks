import React from "react";
import { Link } from "gatsby";
import {Button} from "react-bootstrap";
import "../styles/card.scss";
import {BsBoxArrowRight} from 'react-icons/bs'

/**
 * Creates a bootstrap card for each of the entity. Each card contains some brief info about the
 * entity, including the name, date, etc.
 * @param {*} props the properties that can be passed when used this component
 * @returns a react card, wrapped with a GatsbyJS Link
 */

const EntityCard = (props) => {
  const { entity, index, size} = props;


  let name = '';
  let date = '';

  if("nameEntries" in entity){
    let entries = entity.nameEntries[0].original.split(",");
    if(entity.entityType.term === "person"){
      date =  entries.pop();
      name = entries.join(",");
    }
    else{
      name = "Corporate Body";
    }
  }

  return (
    <Link className="g-link" to={"/people/" + entity.arkId}>
      <div className="card entity-card">
        <div className="card-body">
          <h5 className="card-title">
            {name}
          </h5>
          <hr class="card-hr" />
          <h6 className="card-subtitle mb-2">{date}</h6>
          <div className="card-footer">
            <small
              id="entity-card-footer-index"
              className="text-muted"
            >{`${index+1} out of ${size}`}</small>
            <Button variant="outline-success">
              <BsBoxArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EntityCard;
