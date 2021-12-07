import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: "5px solid red"}} dangerouslySetInnerHTML={{ __html: pageContext.html }}>
          I am 
      </div>
    );
}

export default BgComponent
