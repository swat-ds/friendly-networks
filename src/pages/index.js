import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Layout from '../components/Layout'


const home = () => {
  return (
    <Wrapper>
      <Layout></Layout>
    </Wrapper>
  );
};

//TODO: Style this component
const Wrapper = styled.main`

`
export default home;
