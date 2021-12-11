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
       let facs = [];
        for (let i = 0; i < els.length; i++) {
          let el = els[i];
          if (el.attributes.getNamedItem("facs").value !== null) {
            facs.push(el.attributes.getNamedItem("facs").value);
          }
        }
      //  console.log(els)
       setFacs([facs])
     }
    }, [hasFacsChange])

    console.log(facs)


    const routes = {
    "tei-teiheader": El.TeiHeader,
    //"tei-ab"
    "tei-add": El.Add,
    "tei-body": El.Body,
    "tei-cell": El.TableCell,
    "tei-closer": El.Block,
    //"tei-damage"
    "tei-dateline": El.Dateline,
    "tei-del": El.Del,
    "tei-div": El.Entry,
    //"tei-docTitle"?
    //"tei-figDesc"
    //"tei-figure"
    "tei-floatingtext": El.FloatingText,
    "tei-gap": El.Gap,
    "tei-head": El.Head,
    "tei-item": El.Item,
    //"tei-label"
    //"tei-lb"?
    "tei-l": El.Line,
    "tei-lg": El.LineGroup,
    "tei-list": El.List,
    "tei-note": El.Note,
    "tei-opener": El.Block,
    "tei-p": El.Para,
    "tei-pb": El.Pb,
    "tei-persname": El.Name,
    "tei-postscript": El.Block,
    "tei-q": El.Said,
    "tei-quote": El.Quote,
    "tei-row": El.TableRow,
    "tei-rs": El.Name,
    "tei-said": El.Said,
    "tei-salute": El.Salute,
    "tei-signed": El.Signed,
    //"tei-space"
    "tei-supplied": El.Supplied,
    "tei-table": El.Table,
    "tei-title": El.Title, //titlePart?
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
