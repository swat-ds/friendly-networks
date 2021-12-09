import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style={{border: ""}} dangerouslySetInnerHTML={{ __html: pageContext.html }}>
      </div>
    );
}

export default BgComponent
