import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: "10px solid black"}} dangerouslySetInnerHTML={{ __html: }}>
       {}
      </div>
    );
}

export default BgComponent
