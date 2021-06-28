import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
    return (
      <Wrapper className="footer">
        <h5>
          Created by Digital Scholarship @ Swarthmore
        </h5>
      </Wrapper>
    );
}
//TODO: Style this component
const Wrapper = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: rebeccapurple;
  color: white;
  text-align: center;
  border: medium solid #2596be;
`;
export default Footer
