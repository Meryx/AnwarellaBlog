import React from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import Header from '../components/Header';
import Body from '../components/Body';
import { StaticImage } from "gatsby-plugin-image";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { IconContext } from "react-icons";

const About = () => (

  <Layout>

    <Helmet>
      <meta charSet="utf-8" />
      <title>About!</title>
    </Helmet>

    <Header title="About" />

    <IconContext.Provider value={{ size: "2em" }}>
      <Body>
        <div class="row">
          <div class="col">
            <StaticImage
              src="./images/face.jpg"
              alt="Avatar"
              placeholder="blurred"
              imgClassName="portrait"
            />
            <ul style={{ marginTop: 20 + "px" }} class="network-icon">
              <li>
                <a href="https://twitter.com/Anwarella_">
                  <BsTwitter />
                </a>
              </li>
              <li>
                <a href="https://github.com/Meryx">
                  <BsGithub />
                </a>
              </li>
            </ul>
          </div>
          <div class="col">
            <p>Currently a Computer Science student @ KAUST.</p>
          </div>
        </div>

      </Body>
    </IconContext.Provider>

  </Layout>
);

export default About;
