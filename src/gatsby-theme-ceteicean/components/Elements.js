import React, {useEffect, useState, useRef} from "react";
import { TEINodes } from "react-teirouter";
import { Behavior } from "gatsby-theme-ceteicean/src/components//Behavior";
// import { isExportSpecifier } from "typescript";
import "../../assets/styles/ceteicean.scss";
import {Link} from 'gatsby'
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap'


export const Note = (props) => {

  const [click, setClick] = useState(false);
  const ref = useRef()

  function handleClick(event) {
    setClick(true);
  }

function handleMouseLeave(event) {
  setClick(false);
}

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
        <span>{"["} </span>
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
      title = "marginal note...";
    } else {
      title = place + " " + "marginal note...";
    }

  }
  if (noteType === "editorial") {
    title = "editors' note...";
  }
//   .wrapper:hover .tooltip {
//   transition: all 1s ease-in-out 0s;
//   opacity: 1;
// }



  return (
    <Behavior node={props.teiNode}>
      <div class="wrapper" onClick={handleClick} onMouseLeave={handleMouseLeave}>
        <span className="general-text">[{title}]</span>
        <div class="tooltip" ref={ref} style={click? {cursor: "pointer", transition: "all 1s ease-in-out 0s", opacity: 1}: {}}>
          <p className="journal-note general-text">
            {/* <span>{props.teiNode.attributes.getNamedItem("facs").value}</span> */}
            {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
          </p>
        </div>
      </div>
    </Behavior>
  );
};

export const Name = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <Link
        class="name-g-link"
        id={props.teiNode.attributes.getNamedItem("key").value}
        to={"/entities/" + props.teiNode.attributes.getNamedItem("key").value}
      >
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </Link>
    </Behavior>
  );
};

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

export const Pb = (props) => {

  // const ref = useRef();
  // const isVisible = useOnScreen(ref);

  // if(isVisible){
  //   console.log("I am visible")
  // }
  return (
    <Behavior node={props.teiNode}>
      <span>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</span>
      <hr
        className="page-line"
        id={props.teiNode.attributes.getNamedItem("facs").value}
        style={{ height: 4}}
        // ref={ref}
      />
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

  console.log("In Add()")
  console.log(props.teiNode);
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
        <span style={{ textDecoration: "line-through", color: "red" }}>
          <span style={{color: "black"}}>
            {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
          </span>
        </span>
      </Behavior>
    );
}
export const Gap = (props) =>{
    return (
      <Behavior node={props.teiNode}>
        <span >[...]</span>
      </Behavior>
    );
}

export const Entry = (props) => {
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

export const Body = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <main>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</main>
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
    // console.log("In Dateline()")
    // console.log(<Behavior node={props.teiNode}/>)
    return("");
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
  // function getBreaks(){
  //   if(props.teiNode.sibling){

  //   }
  // }
  // const ref = useRef();
  // console.log(ref.current.nextSibling);
  // console.log(props);

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

export const Head = (props) => {
  return (
    <Behavior node={props.teiNode}>
      <h3>
        {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
      </h3>
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




// //MNBN
// export const TEI = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <p>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
//     </Behavior>
//   );
// };


//MNBN


// export const Text = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <text>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</text>
//     </Behavior>
//   );
// };


// export const Emph = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <p >{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</p>
//     </Behavior>
//   );
// };


// export const Figure = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <figure>
//         {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
//       </figure>
//     </Behavior>
//   );
// };

// export const Table = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <table>
//         {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
//       </table>
//     </Behavior>
//   );
// };

// export const Row = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <tr>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</tr>
//     </Behavior>
//   );
// };

// export const Cell = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <td>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</td>
//     </Behavior>
//   );
// };

// export const Label = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <label>
//         {<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}
//       </label>
//     </Behavior>
//   );
// };

// export const Item = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <li>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</li>
//     </Behavior>
//   );
// };



// export const List = (props) => {
//   return (
//     <Behavior node={props.teiNode}>
//       <ul>{<TEINodes teiNodes={props.teiNode.childNodes} {...props} />}</ul>
//     </Behavior>
//   );
// };
