import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div >
        <span dangerouslySetInnerHTML={{ __html: pageContext.body }}></span>
      </div>
    );
}

export default BgComponent
