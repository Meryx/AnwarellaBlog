import React from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import Header from '../components/Header';
import Body from '../components/Body';

const About = () => (

  <Layout>

    <Helmet>
      <meta charSet="utf-8" />
      <title>About!</title>
    </Helmet>

    <Header title="About"/>

    <Body>
      <p>I am currently a senior Computer Science student at #FCIT. My main career interests lie in
      Web and application development. However, I love <i>everything</i> Computer Science!
      Don't hesitate to DM me on Twitter for any questions!</p>
      <a href='https://twitter.com/Anwarella_'>@Anwarella_</a>
    </Body>

  </Layout>
);

export default About;
