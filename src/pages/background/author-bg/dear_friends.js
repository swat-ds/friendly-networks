import React from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import DearFriends from "../../../components/essay/DearFriends";
import { Button, Row, Col } from "react-bootstrap";

const dear_friends = () => {
  return (
    <Layout>
     <DearFriends/>
    </Layout>
  );
};

export default dear_friends;
