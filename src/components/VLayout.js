//Vertical Layout. Wraps minimum of Photo and BioData components
import React from 'react'
import styled from "styled-components";
import Portrait from './Portrait'
import BioData from './Biodata'

const VLayout = (props) => {
    return (
        <Wrapper className="vertical-layout">
            <Portrait></Portrait>   
            <BioData></BioData> 
            {props.children}
        </Wrapper>
    )
}

//TODO: Style this component
const Wrapper = styled.div`

`

export default VLayout
