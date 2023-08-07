import React from "react";
import { Link } from "gatsby";
import "../styles/card.scss";
import {journalTnLookup} from '../globalVariables'
import Card from 'react-bootstrap/Card'

const JournalCard = ({ node }) => {
  const titleArray = node.title.split(", ");
  const title = titleArray[0].replace('Journal', 'journal');
  const date = titleArray[1].split('- ').reduce(
      // Add a line break between the two components of date ranges
      (accumulator, current) => {return (<>{accumulator}- <br/>{current}</>)}
    )

  // Construct urls of thumbnail images held in Islandora
  const thumbnailUrl = journalTnLookup[node.route.split("/").pop()]

  return(
    <Card bg="primary" className="journal-card">
      <Link to={node.route}>
        <Card.Img src={thumbnailUrl} alt=""/>
        <Card.Body>
          <Card.Title>
            {title}
          </Card.Title>
          <Card.Subtitle>
            {date}
          </Card.Subtitle>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default JournalCard;
