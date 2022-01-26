import React from "react";
import { Link } from "gatsby";
import { Row, Table, Card, Col } from "react-bootstrap";
import "../styles/entity.scss";
import hat from "../../content/assets/images/A00184813_hat.jpg";
import bonnet from "../../content/assets/images/A00184806_bonnet.jpg";


const EntityCardDeck = ({entityDeck}) => {

  // Sort Objects Numerically

  entityDeck.sort( (a, b) => a.nameEntries[0].original > b.nameEntries[0].original?  1: -1);

  // Sort Objects Alphabetically

  const renderEntityRow = (entity, index) => {

    // Set name and date
    let name = "unknown";
    let date = "unknown";
    if ("nameEntries" in entity) {
      let entries = entity.nameEntries[0].original.split(",");
      if (entity.entityType.term === "person") {
        date = entries.pop();
        name = entries.join(",");
      } else {
        name = "Corporate Body";
      }
    }

    // Dummy, empty div to push card title to bottom
    let image = (<div id="gap" style={{aspectRatio:"1"}}/>)

    // Get image supplied from ImgSrc field of cFI.tsv
    /*if (entity.imageSrc) {
      image = <Card.Img src={entity.imageSrc} alt="[Thumbnail]"/>
    }

    // If entity has "Quakers" occupation
    else*/ if (entity?.occupations?.some(x => x.term.term === "Quakers")){
      if (entity?.genders.some(x => x.term.term === "Male")) {
        image = (
          <Card.Img
            src={hat}
            variant="top"
            alt="Mannequin in top hat"
          />
        );

      } else if (entity?.genders.some(x => x.term.term === "Female")) {
        image = (
          <Card.Img
            src={bonnet}
            variant="top"
            alt="Mannequin in bonnet"
          />
        );
      }
    }

    return(
      <Col className="entity-card-col">
        <Card bg="primary" text="secondary" className="entity-card">
          <Link to={"/people/" + entity.arkId}>
            {image}
            <Card.Body>
              <Card.Title as="h6">
                {name}
              </Card.Title>
              <Card.Subtitle>
                {date}
              </Card.Subtitle>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    );
  };


   return (
     <Row id="main-row">
       <h1>People</h1>
       <p>Click a person's card to see their biographical profile.</p>
       <Row xs={2} small={3} md={3} lg={5} xl={8} xxl={10} className="entity-card-row">
         {entityDeck.map(renderEntityRow)}
       </Row>
     </Row>
   );
};

export default EntityCardDeck;
