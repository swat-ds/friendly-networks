import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: post.html }}>
      </div>
    );
}

export default BgComponent
