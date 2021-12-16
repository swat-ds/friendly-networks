import React from "react";
import { Link } from "gatsby";
import "../styles/card.scss";
import { months } from "../globalVariables";
import {Button } from 'react-bootstrap'
import {BsBoxArrowRight} from 'react-icons/bs'



const JournalCard = ({ node, index, size }) => {

  return (
    <Link className="g-link" to={node.route}>
      <div className="card journal-card">
        <div className="card-body">
          <h5 className="card-title">
            {`${node.title}`}
            <br />
          </h5>
          <hr class="card-hr" />
          <p className="card-subtitle mb-2">
            {/* `{}` */}
            <span>from {` `}</span>
            {node.startMonth ? (
              <span className="date">{`${
                months[node.startMonth - 1].name
              } `}</span>
            ) : (
              ""
            )}
            {node.startDay ? (
              <span className="date">{`${node.startDay}, `}</span>
            ) : (
              ""
            )}
            {node.startYear ? (
              <span className="date">{`${node.startYear}`}</span>
            ) : (
              ""
            )}
            <br />
            {node.startYear !== undefined ? <span>to {` `}</span> : ""}
            {node.endMonth ? (
              <span className="date">{`${months[node.endMonth - 1].name} `}</span>
            ) : (
              ''
            )}
            {node.endDay ? <span className="date">{`${node.endDay}, `}</span> : ""}
            {node.endYear ? <span className="date">{`${node.endYear}`}</span> : "Unknown"}
            {/* {`${beginningMonth} ${beginningDay}, ${beginningYear} to ${endingMonth} ${endingDay}, ${endingYear}`} */}
          </p>
          <p className="card-text">{node.description}</p>
          <div className="card-footer">
            <small
              id="journal-card-footer-index"
              className="text-muted"
            >{`${index+1} out of ${size}`}</small>
            <Button variant="outline-success"><BsBoxArrowRight/></Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard;
