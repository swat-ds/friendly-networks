import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: pageContext.body }}>
      </div>
    );
}

export default BgComponent
