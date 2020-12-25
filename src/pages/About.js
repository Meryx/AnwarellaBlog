import React from "react";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import "./about.css";

const About = () => (
  <Layout>
    <div className="about">
      <h1>About</h1>
      <Nav />

    <div className ="aboutBody">
      <p>For now check my twitter bio &lt;3</p>
    </div>
  </div>
  </Layout>
);

export default About;
