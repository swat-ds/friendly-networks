import React from 'react'
import styled from "styled-components";

const Navbar = (props) => {
    return (
      <Wrapper className="navbar">
        <nav className="nav-body">
          <button className="nav-btn">who</button>
          <button className="nav-btn">where</button>
          <button className="nav-btn">when</button>
        </nav>
        {props.children}
      </Wrapper>
    );
}

//TODO: Style this component
const Wrapper = styled.div`

`
export default Navbar
