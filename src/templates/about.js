import React from 'react';
import Layout from '@components/Layout';
import Body from '@components/Body';
import { StaticImage } from 'gatsby-plugin-image';
import { BsTwitter, BsGithub, BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const About = ({ data, pageContext }) => {
  const resumeURL = pageContext.resume;
  return (
    <Layout>
      <IconContext.Provider value={{ size: '2em' }}>
        <Body>
          <div className="row">
            <div className="col">
              <StaticImage src="../pages/images/face.jpg" alt="Avatar" placeholder="blurred" imgClassName="portrait" />
              <ul style={{ marginTop: 20 + 'px' }} className="network-icon">
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
                <li>
                  <a href={resumeURL} download>
                    <BsFillFileEarmarkPdfFill />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col2">
              <p>
                Currently pursuing a Master of Science in Computer Science @ KAUST. My research interests lie primarily
                in the field of Computer Graphics. Feel free to check out my Twitter and Github. You could also download
                my resume by clicking on the PDF icon.
              </p>
            </div>
          </div>
        </Body>
      </IconContext.Provider>
    </Layout>
  );
};

export default About;
export function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>About</title>
    </>
  );
}
