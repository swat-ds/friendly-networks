import React from "react";

import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Image from "../components/Image";
import { Button } from "react-bootstrap";

const journals = ({ data }) => {
  return (
    <>
      <Layout>
        <Button variant="outline-info">
          <Link to={"/" + data.allCetei.nodes[0].parent.name}>Journal 1</Link>
        </Button>
      </Layout>
    </>
  );
};

export const data = graphql`
  {
    allCetei {
      totalCount
      nodes {
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  }
`;
export default journals;
