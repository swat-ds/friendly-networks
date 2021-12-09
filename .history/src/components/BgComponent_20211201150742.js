import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div>
        <span
          style={{ color: "black" }}
          dangerouslySetInnerHTML={{ __html: pageContext.rawMarkdownBody }}
        ></span>
      </div>
    );
}

export default BgComponent
