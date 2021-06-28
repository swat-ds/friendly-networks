import React from 'react'
import styled from "styled-components";

const Portrait = (props) => {
    return (
        <Wrapper id="portrait" className="portrait" name="Portrait Section">
            {props.children}
        </Wrapper>
    )
}

//TODO: Style this component
const Wrapper = styled.section`

`
export default Portrait
