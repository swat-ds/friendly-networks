import React from "react"
import {useState, useEffect } from 'react'
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import {Container, Row, Button, Col} from 'react-bootstrap'
import { graphql, Link } from "gatsby";
import Volume from '../../components/Volume'

import * as El from "./Elements"
import "../../styles/styles.scss";



const ShadowedCeteicean = ({pageContext, data, location}) => {
  let hash = location.hash;
  const [facs, setFacs] = useState([])
  const [hasFacsChange, setHasFacsChange] = useState(false);

   useEffect(() => {
     if (window !== undefined && document !== undefined) {
       let els = document.getElementsByTagName('tei-pb');
       let facsimiles = [];
        for (let i = 0; i < els.length; i++) {
          let el = els[i];
          if (el.attributes.getNamedItem("facs").value !== null) {
            facsimiles.push(el.attributes.getNamedItem("facs").value);
          }
        }
       console.log(facsimiles);
       setFacs(facsimiles);
     }
    }, [hasFacsChange])

    console.log(facs)

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
