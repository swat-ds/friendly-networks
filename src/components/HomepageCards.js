import React from "react";
import { Link } from "gatsby";
import { Row, Col, Card } from "react-bootstrap";

const buildCard = (entity, index) => {
  const text = entity.text;
  const link = entity.link;
  const imageSrc = entity.imageSrc;
  const alt = entity.alt;
  const id = entity.id;

  return (
    <Col className="homepage-card-col">
      <Card
        bg="primary"
        text="secondary"
        className="homepage-card"
        id={id}
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


const homepageCards = (cardArray) => {
  return (
    <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={4} id="homepage-card-row">
      {cardArray.map(buildCard)}
    </Row>
  );
};

export default homepageCards;
