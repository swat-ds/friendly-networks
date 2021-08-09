import React from "react"
import {useState, useEffect } from 'react'
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import {Container, Row, Button, Col} from 'react-bootstrap'
import { graphql, Link } from "gatsby";
import Volume from '../../components/Volume'

import * as El from "./Elements"
import "../../assets/styles/styles.scss";



const ShadowedCeteicean = ({pageContext, data}) => {
  const nodes = data.allCetei.nodes;
  //Create indices for the journal file names
  let name_index = new Map();
  nodes.forEach((node, index) =>{
    name_index.set(node.parent.name, index);
  })


  const routes = {
    "tei-TEI": El.TEI,
    "tei-teiHeader": El.Header,
    "tei-text": El.Text,
    "tei-body": El.Body,
    "tei-pb": El.Pb,
    "tei-div": El.Entry,
    "tei-persname": El.Name,
    "tei-dateline": El.Dateline,
    "tei-date": El.EntryDate,
    "tei-p": El.Para,
    "tei-emph": El.Emph,
    "tei-floatingtext": El.FloatingText,
    "tei-quote": El.Quote,
    "tei-l": El.I,
    "tei-figure": El.Figure,
    "tei-note": El.Note,
    "tei-table": El.Table,
    "tei-row": El.Row,
    "tei-cell": El.Cell,
    "tei-list": El.List,
    "tei-item": El.Item,
    "tei-label": El.Label,
    "tei-title": El.Title,
    "tei-said": El.Said,
  }; 
  // for (let index = 0; index < hrs.length; index++) {
  //   console.log(hrs[index].height)
    
  // }
  return (
    <Volume pageContext={pageContext} data={data} name_index={name_index}>
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
