import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: post.html }}>
        <span dangerouslySetInnerHTML={{ __html: pageContext.html }}></span>
      </div>
    );
}

export default BgComponent
