import React from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import Bookshelf from "../../../components/essay/Bookshelf";
import { Button, Row, Col } from "react-bootstrap";

const bookshelf = () => {
  return (
    <Layout>
     <Bookshelf/>
    </Layout>
  );
};

export default bookshelf;
