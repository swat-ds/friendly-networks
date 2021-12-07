import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: "5px solid red"}} dangerouslySetInnerHTML={{ __html: pageContext.html }}>
          I am the background component
      </div>
    );
}

export default BgComponent
