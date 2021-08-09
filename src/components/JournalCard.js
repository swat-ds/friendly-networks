import React from 'react'
import {Link} from 'gatsby'
import "../assets/styles/card.scss";

const JournalCard = ({ route }) => {
  return (
    <Link className="g-link" to={route}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Journal Display</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <p>Journal Index</p>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard
