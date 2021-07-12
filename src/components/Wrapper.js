import React from 'react'
import styled from "styled-components";

const Wrapper = (props) => {
    return (
        <WrapperMain>
            {props.children}
        </WrapperMain>
    )
}

export default Wrapper

//TODO: Style this component
const WrapperMain = styled.main`
display: flex;
float: column;
justify-content: center;
`