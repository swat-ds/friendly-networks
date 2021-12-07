import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: ""}}>
       {pageContext.rawMarkdownBody}
      </div>
    );
}

export default BgComponent
