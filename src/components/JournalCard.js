import React from 'react'
import {Link} from 'gatsby'
import "../assets/styles/card.scss";

const JournalCard = ({ route, title, subtitle, text, index, total }) => {
  return (
    <Link className="g-link" to={route}>
      <div className="card journal-card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2">{subtitle}</h6>
          <p className="card-text">{text}</p>
          <p className="text-muted">{`${index} out of ${total}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard
