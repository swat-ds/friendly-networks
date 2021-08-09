import React from "react";
import { TEINodes } from "react-teirouter";
import { Behavior } from "gatsby-theme-ceteicean/src/components//Behavior";
// import { isExportSpecifier } from "typescript";
import "../../assets/styles/ceteicean.scss";
import {Link} from 'gatsby'

export const EntryDate = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </p>
    </Behavior>
  );
};

export const Name = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <Link
        class="name-g-link"
        to={"/entities/" + props.teiNode.attributes.getNamedItem("key").value}
      >
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </Link>
    </Behavior>
  );
};


export const Entry = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <div>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</div>
    </Behavior>
  );
};

//MNBN
export const TEI = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
    </Behavior>
  );
};

//MNBN
export const Header = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <header>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </header>
    </Behavior>
  );
};

export const Text = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <text>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</text>
    </Behavior>
  );
};

export const Body = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <main>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</main>
    </Behavior>
  );
};

export const Pb = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <span>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</span>
      <hr
        className="page-line"
        id={props.teiNode.attributes.getNamedItem("facs").value}
        
      />
    </Behavior>
  );
};

export const Dateline = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <span>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</span>
    </Behavior>
  );
};

export const Emph = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p >{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
    </Behavior>
  );
};

export const Para = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
    </Behavior>
  );
};

export const FloatingText = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <text>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</text>
    </Behavior>
  );
};

export const Quote = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <q>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</q>
    </Behavior>
  );
};

export const I = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <i>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</i>
    </Behavior>
  );
};

export const Figure = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <figure>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </figure>
    </Behavior>
  );
};

export const Note = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
    </Behavior>
  );
};

export const Table = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <table>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </table>
    </Behavior>
  );
};

export const Row = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <tr>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</tr>
    </Behavior>
  );
};

export const Cell = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <td>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</td>
    </Behavior>
  );
};

export const Label = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <label>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </label>
    </Behavior>
  );
};

export const Item = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <li>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</li>
    </Behavior>
  );
};

export const Title = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <h1>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</h1>
    </Behavior>
  );
};

export const Said = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <q>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</q>
    </Behavior>
  );
};

export const List = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <ul>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</ul>
    </Behavior>
  );
};
