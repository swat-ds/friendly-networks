import React from "react";
import { Link } from "gatsby";
import { Row, Col, Card } from "react-bootstrap";



const HomepageCards = ({cardArray, sm, md}) => {
  const buildCard = (entity) => {
    const text = entity.text;
    const link = entity.link;
    const imageSrc = entity.imageSrc;
    const alt = entity.alt;
    const id = entity.id;
  
    return (
      <Col className="homepage-card-col" id={id} sm={sm} md={md}>
        <Card
          bg="primary"
          text="secondary"
          className="homepage-card"
        >
          <Link to={link}>
            <Card.Img
              src={imageSrc}
              alt={alt}
              className="homepage-card-image"
              variant="top"
            />
            <Card.Body><Card.Title>{text}</Card.Title></Card.Body>
          </Link>
        </Card>
      </Col>
    );
  }
  return (
    <>
      {cardArray.map(buildCard)}
    </>
  );
};

export default HomepageCards;
