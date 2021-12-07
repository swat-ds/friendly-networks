import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div>
        <span dangerouslySetInnerHTML={{ __html: pa.html }}></span>
      </div>
    );
}

export default BgComponent
