import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: "10px solid "}}>
       {pageContext.rawMarkdownBody}
      </div>
    );
}

export default BgComponent
