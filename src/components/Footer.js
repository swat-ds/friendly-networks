import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
    return (
      <Wrapper className="footer">
        <h5>
          Created by Digital Scholarship @ Swarthmore College
          All Rights are Reserved
        </h5>
      </Wrapper>
    );
}
//TODO: Style this component
const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: rebeccapurple;
  color: white;
  text-align: center;
  border: medium solid #2596be;
`;
export default Footer
