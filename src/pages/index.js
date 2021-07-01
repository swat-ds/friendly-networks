import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Layout from '../components/Layout'
import Image from '../components/Image'


const home = () => {
  return (
    <Wrapper>
      <Layout>
        <Image></Image>
      </Layout>
    </Wrapper>
  );
};

//TODO: Style this component
const Wrapper = styled.main`
display: flex;
float: column;
justify-content: center;
`
export default home;
