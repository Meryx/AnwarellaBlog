import React from "react";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import "./about.css";

const About = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About!</title>
      <link rel="canonical" href="https://anwarellablog.me/About" />
    </Helmet>
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
