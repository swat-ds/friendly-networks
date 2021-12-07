import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: pageContext.html }}>
      </div>
    );
}

export default BgComponent
