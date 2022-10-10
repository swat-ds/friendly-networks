import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import { graphql } from "gatsby";
import EntityCardDeck from  "../components/EntityCardDeck"

const people = ({ data }) => {
  let deck = data.allConstellation.nodes
    return (
      <Layout>
        <EntityCardDeck entityDeck={deck}></EntityCardDeck>
      </Layout>
    );
};

// Enrich <head> tag
export const Head = () => (
  <SEO title="People - Friendly Networks"/>
)

export default people;

 export const query = graphql`
  {
    allConstellation {
      nodes {
        id
        arkId
        imageSrc
        entityType {
          term
        }
        nameEntries {
          original
        }
        genders {
          term {
            term
          }
        }
        occupations {
          term {
            term
          }
        }
      }
    }
  }
`;
