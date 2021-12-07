import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div style=>
       {pageContext.rawMarkdownBody}
      </div>
    );
}

export default BgComponent
