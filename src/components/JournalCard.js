import React from "react";
import { Link } from "gatsby";
import "../styles/card.scss";
import { months } from "../globalVariables";
import Card from 'react-bootstrap'



const JournalCard = ({ node, index, size }) => {
  const titleArray = node.title.split(", ");
  const title = titleArray[0];
  const subtitle = titleArray[1];

  // Construct urls of thumbnail images held in Islandora
  const thumbnailUrl = "https://digitalcollections.tricolib"
    + ".brynmawr.edu/islandora/object/sc:"
    + node.route.split("sc").pop()
    + "/datastream/TN";

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
