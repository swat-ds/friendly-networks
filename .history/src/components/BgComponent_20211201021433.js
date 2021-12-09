import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{color: "black"}} dangerouslySetInnerHTML={{ __html: pageContext.body }}>
      </div>
    );
}

export default BgComponent
