import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: "10px solid black"}} dangerouslySetInnerHTML={{ __html}}>
       {pageContext.rawBody}
      </div>
    );
}

export default BgComponent
