import styled from 'styled-components'
import {Link} from 'gatsby'

import React from 'react'

export const Button = styled(Link)`
  background: ${({ primary }) => (primary ? "#F26A2E" : "#077BF1")};
  white-space: nowrap;
  position: absolute;
  padding: ${({ big }) => (big ? "16px 40px" : "10px 32px")};
  padding: ${({ big }) => (big ? "20px" : "16px")};
  border: none;
  outline: none;
  min-width: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  float: left;
  left: 80rem;
  border-radius: ${({ round }) => (round ? "50px" : "none")};

  &:hover {
    background: ${({ primary }) => (primary ? "#077BF1" : "#F26A2E")};
    transform: translateY(-2px);
  }
`
