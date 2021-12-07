import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div>
        <span dangerouslySetInnerHTML={{ __html: .html }}></span>
      </div>
    );
}

export default BgComponent
