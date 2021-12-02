import React from "react"
import {useState, useEffect } from 'react'
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import {Container, Row, Button, Col} from 'react-bootstrap'
import { graphql, Link } from "gatsby";
import Volume from '../../components/Volume'

import * as El from "./Elements"
import "../../assets/styles/styles.scss";



const ShadowedCeteicean = ({pageContext, data, location}) => {
  let hash = location.hash;


    const routes = {
    "tei-teiheader": El.TeiHeader,
    "tei-body": El.Body,
    "tei-head": El.Head,
    "tei-pb": El.Pb,
    "tei-div": El.Entry,
    "tei-persname": El.Name,
    "tei-rs": El.Name,
    "tei-gap": El.Gap,
    "tei-del": El.Del,
    "tei-add": El.Add,
    "tei-supplied": El.Supplied,
    "tei-dateline": El.Dateline,
    "tei-p": El.Para,
    "tei-floatingtext": El.FloatingText,
    "tei-quote": El.Quote,
    "tei-l": El.Line,
    "tei-note": El.Note,
    "tei-title": El.Title,
    "tei-said": El.Said,
    "tei-lg": El.LineGroup,
  };
  return (
    <Volume pageContext={pageContext} data={data} hash={hash}>
      <Ceteicean pageContext={pageContext} routes={routes} />
    </Volume>
  );

}

export const query = graphql`
  {
    allCetei {
      totalCount
      nodes {
        original
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
export default ShadowedCeteicean
