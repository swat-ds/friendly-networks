import React from "react";
import { Link } from "gatsby";
import "../styles/card.scss";
import {journalTnLookup} from '../globalVariables'
import Card from 'react-bootstrap/Card'

const JournalCard = ({ node }) => {
  const titleArray = node.title.split(", ");
  const title = titleArray[0];
  const subtitle = titleArray[1].replace('- ', '- \n');

  // Construct urls of thumbnail images held in Islandora
  const thumbnailUrl = journalTnLookup[node.route.split("/").pop()]

  return(
    <Card bg="primary" className="journal-card">
      <Link to={node.route}>
        <Card.Img src={thumbnailUrl} alt=""/>
        <Card.Body>
          <Card.Subtitle>
            {title}
          </Card.Subtitle>
          <Card.Title>
            {subtitle}
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default JournalCard;
