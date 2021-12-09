import React from 'react'
import Laout 

const BgComponent = ({pageContext}) => {
    return (
      <div
        style={{ border: "10px solid black" }}
        dangerouslySetInnerHTML={{ __html: pageContext.body }}
      >
      </div>
    );
}

export default BgComponent
