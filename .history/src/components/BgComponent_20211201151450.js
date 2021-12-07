import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div>
       {pageContext.raw}
      </div>
    );
}

export default BgComponent
