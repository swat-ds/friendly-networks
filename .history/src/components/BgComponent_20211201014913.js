import React from 'react'

const BgComponent = ({pageContext}) => {
    return (
        <div>
            <span>{pageContext.body}</span>
        </div>
    )
}

export default BgComponent
