import React from 'react'
import styled from 'styled-components'

const Image = () => {
    return (
      <Wrapper>
        <img
          src="https://digitalcollections.tricolib.brynmawr.edu/iiif/2/sc:203248~JP2~470f51915ee42083c974f3d5a02%5B%E2%80%A6%5Dcc9da0bb20ff9f541d82a/full/pct:100/1/default.jpg"
          alt="manuscript image"
        />
      </Wrapper>
    );
}

export default Image

const Wrapper= styled.div`

img{
    height: 7in;
    width: 5in;
}
`
