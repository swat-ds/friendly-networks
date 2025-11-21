import React from "react"
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"
import * as El from "./Elements"
import "../../styles/styles.scss";
import {TBehavior} from "gatsby-theme-ceteicean/src/components/DefaultBehaviors"

export type Routes = {
  [key: string]: TBehavior | JSX.Element
}

const ShadowedCeteicean = ({pageContext}) => {

  const routes: Routes = {
    "tei-teiheader": El.TeiHeader,
    //"tei-ab"
    "tei-add": El.Add,
    "tei-addrline": El.AddrLine,
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
    "tei-text": El.Text,
    "tei-title": El.Title, //titlePart?
    // "tei-unclear"
  };

  return (
      <Ceteicean pageContext={pageContext} routes={routes} />
  );

}

export default ShadowedCeteicean