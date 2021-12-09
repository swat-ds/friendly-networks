import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div>
       {pageContext.rawMarkdownBody}
      </div>
    );
}

export default BgComponent
