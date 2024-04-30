import React from "react";
import { TEINodes } from "react-teirouter";
// import { Behavior } from "gatsby-theme-ceteicean/src/components//Behavior";
import { Behavior } from "gatsby-theme-ceteicean/src/components/Behavior";
import "../../styles/ceteicean.scss";
import {Link} from 'gatsby';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const Note = (props) => {


  let prevNode = props.teiNode?.previousElementSibling;

  while (["tei-note", "tei-p"].includes(prevNode?.localName)) {
    if (prevNode?.localName === "tei-p" && !(props?.render)){
      return(<Behavior node={props.teiNode}/>);
    }
    prevNode = prevNode?.previousElementSibling
  }

  let noteType = props.teiNode.attributes.getNamedItem("type")?.value || "Note";
  if (noteType === "structure") {
    return (
      <Behavior node={props.teiNode}>
        <span>{"["}</span>
        <span style={{ fontStyle: "italic" }}>
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </span>
        <span>{"]"}</span>
      </Behavior>
    );
  }
  let title = "Note...";

  // Extract a value from @place to display
  if (noteType === "authorial") {
    let place;
    place = props.teiNode.attributes.getNamedItem("place")?.value || "margin";
    place = place.split(" ")[0]
    if (place === "margin") {
      title = "marginal note";
    } else {
      title = place + " " + "marginal note";
    }

  }
  if (noteType === "editorial") {
    title = "editors' note";
  }

  const popover = (
    <Popover>
      {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
    </Popover>
   );

  return (
    <Behavior node={props.teiNode}>
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      flip="true"
      rootClose
      overlay={popover}
     >
      <div class="wrapper">
        <span className="general-text">[{title}]</span>
      </div>
      </OverlayTrigger>
    </Behavior>
  );
};

export const Name = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <Link
        class="name-g-link"
        id={props.teiNode.attributes.getNamedItem("key").value}
        to={"/people/" + props.teiNode.attributes.getNamedItem("key").value}
        target="_blank"
      >
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </Link>
    </Behavior>
  );
};

/*
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
*/

export const Pb = (props) => {

  return (
    <Behavior node={props.teiNode}>
      <hr
        className="page-line tei-pb"
        data-facs={props.teiNode.attributes.getNamedItem("facs").value}
        />
      {/*Page number that, when clicked, copies link to page to clipboard*/}
      <button
        title="Copy link to page"
        id={"page" + props.teiNode.attributes.getNamedItem("n").value}
        className="page-num"
        onClick={() => {
          if (typeof window !== 'undefined') {
            const url = window.location.href.split("#")[0]
            const id = props.teiNode.attributes.getNamedItem("n").value
            navigator.clipboard.writeText(url+"#page"+id)
          } 
        }}
      >
        Page {parseInt(props.teiNode.attributes.getNamedItem("n").value)}
      </button>
    </Behavior>
  );
};

/**
 *
 *  "tei-gap": El.Gap,
    "tei-del": El.Del,
    "tei-add": El.Add,
    "tei-supplied": El.Supplied,
 */

export const Supplied = (props) =>{
   return (
      <Behavior node={props.teiNode}>
      <span>
        {'['}{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}{']'}
      </span>
    </Behavior>
   )
}
export const Add = (props) =>{
  return (
     <Behavior node={props.teiNode}>
      {"‸"}<span class="superscript">
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </span> {' '}
    </Behavior>
  )
}
export const Del = (props) =>{
    return (
      <Behavior node={props.teiNode}>
        <span style={{ textDecoration: "line-through" }}>
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </span>
      </Behavior>
    );
}
export const Gap = (props) =>{
    return (
      <Behavior node={props.teiNode}>
        {"[...]"}
      </Behavior>
    );
}

export const Entry = (props) => {
  let number = props.teiNode.attributes.getNamedItem("n")?.value
  if (number) {
    return (
      <Behavior node={props.teiNode}>
        <div id={number}>
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </div>
      </Behavior>
    );
  }
  return (
    <Behavior node={props.teiNode}>
      <div>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </div>
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

export const Block = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </p>
    </Behavior>
  );
};

export const Dateline = (props) => {
  let nextNode = props.teiNode?.nextElementSibling;

  // Definitely render the dateline if it has a @render attribute
  if (props?.render) {
    return (
        <u>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </u>
    );
    // Unclear why, but returning a <Behavior> tag here caused Problems –JT
  }

  // Return an empty string if this dateline immediately precedes <p>
  if (nextNode?.localName === "tei-p") {
    return("");
  }

  // Wrap in <p> if within <opener> or <closer>
  if (
    props.teiNode?.closest && // To prevent error where "props.teiNode.closest ≠ a fx"
    (props.teiNode?.closest('tei-closer') || props.teiNode?.closest('tei-opener'))
  ) {
    return (
      <Behavior node={props.teiNode}>
          <p>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
      </Behavior>
    );
  }

  return (
    <Behavior node={props.teiNode}>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
    </Behavior>
  );
};

export const TeiHeader = (props) => {
  return(
    <Behavior node={props.teiNode}/>
  )
}

export const Para = (props) => {

  let prevNode = props.teiNode?.previousElementSibling;
  let nextNode = props.teiNode?.nextElementSibling;

  let dateline = (prevNode?.localName === "tei-dateline")
    ? <Dateline teiNode={prevNode} availableRoutes={props.availableRoutes} render="true"/> :
    "";

  let followingNotes = [];
  while (nextNode?.localName === "tei-note") {
    followingNotes.push(nextNode)
    nextNode = nextNode?.nextElementSibling
  }

  return (
    <Behavior node={props.teiNode}>
      <p>
        {dateline}
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        {followingNotes.map((note) =>
          (
    <Note teiNode={note} availableRoutes={props.availableRoutes} render="true"/>
          )
        )}
      </p>
    </Behavior>
  );
};

export const AddrLine = (props) => {
  return (
    <Behavior node={props.teiNode}>
      {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      <br/>
    </Behavior>
  );
};

export const Head = (props) => {
  if (props.teiNode.parentNode.localName === "tei-table") {
    return (
      <Behavior node={props.teiNode}>
      <caption class="teiHead general-text">
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </caption>
    </Behavior>
    );
  }

  return (
    <Behavior node={props.teiNode}>
      <h2 class="teiHead general-text">
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </h2>
    </Behavior>
  );
};

export const Item = (props) => {
  return(
    <Behavior node={props.teiNode}>
      <li>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </li>
    </Behavior>
  );
};

export const FloatingText = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <floatingText>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</floatingText>
    </Behavior>
  );
};

export const Quote = (props) => {

  let quoteType = props.teiNode.attributes.getNamedItem("type")?.value
  if (quoteType === "poem") {
    return (
      <Behavior node={props.teiNode}>
        <span>
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </span>
      </Behavior>
    );
  }

  return (
    <Behavior node={props.teiNode}>
      <q>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </q>
    </Behavior>
  );
};

export const Line = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <i>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </i>
      <br />
    </Behavior>
  );
};

export const LineGroup = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p className="poem-block">
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </p>
    </Behavior>
  );
};

export const List = (props) => {
  return(
    <Behavior node={props.teiNode}>
      <ul style={{ listStyleType: "none" }}>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </ul>
    </Behavior>
  );
};

export const Salute = (props) => {
  return(
    <Behavior node={props.teiNode}>
      <p>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </p>
    </Behavior>
  );
};

export const Signed = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <p className="signed">
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </p>
    </Behavior>
  );
};

export const Table = (props) => {
  let tableType = props.teiNode.attributes.getNamedItem("type")?.value

  return(
    <Behavior node={props.teiNode}>
      <table className={tableType}>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </table>
      <br/>
    </Behavior>
  );
};

export const TableRow = (props) => {

  let className;

  // If this is an acct-bk table,
  if (props.teiNode.parentElement?.attributes.getNamedItem("type")?.value === "account-book") {
    // and if first cell isn't empty,
    if (! props.teiNode.firstElementChild.hasAttribute('data-empty')) {
      // set the returned <tr>'s class to "date-row"
      className = 'date-row'
    };
  }

  return(
    <Behavior node={props.teiNode}>
      <tr className={className}>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </tr>
    </Behavior>
  );
};

export const TableCell = (props) => {
  
  // Check if the parent <row> has @role attribute "label"; return <th> if so
  let role = props.teiNode.parentNode?.attributes?.getNamedItem("role")?.value
  if (role === "label") {
    return(
      <Behavior node={props.teiNode}>
        <th scope="col">
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </th>
      </Behavior>
    );
  }
  

  // Check if the parent <row> has the "rend" attribute set to "sum"
  let parent = props.teiNode.parentNode?.attributes?.getNamedItem("rend")?.value

  // Check if the cell contains any numbers
  let containsNumber = /\d/.test(props.teiNode?.textContent)
  
  // Check that the cell doesn't contain a month
  let monthFree = ! /mo/i.test(props.teiNode?.textContent)

  // Return <td> with className "sum" if both checks are true
  if (parent === "sum" && containsNumber && monthFree) {
    return(
      <Behavior node={props.teiNode}>
        <td className="sum">
          {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
        </td>
      </Behavior>
    );
  }

  return(
    <Behavior node={props.teiNode}>
      <td>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </td>
    </Behavior>
  );
};

export const Text = (props) => {
  return (
    <Behavior node={props.teiNode}>
    <main>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</main>
    </Behavior>
  );
};

export const Title = (props) => {
  // If <title> is being used to tag document structure:
  if (props.teiNode.parentNode.localName === "tei-head"){
    return(
      <Behavior node={props.teiNode}>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </Behavior>
    );
  }

  // If <title> is being used to tag the name of another work:
  return(
    <Behavior node={props.teiNode}>
      <cite>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </cite>
    </Behavior>
  );
};
