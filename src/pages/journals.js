import React from 'react'

import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Image from "../components/Image";
import {Button} from 'react-bootstrap'

const journals = () => {
    return (
      <>
        <Layout>
          <Button variant="outline-info">
            <Link to="/sc203240">John Hunt</Link>
          </Button>
        </Layout>
      </>
    );
}

export default journals

