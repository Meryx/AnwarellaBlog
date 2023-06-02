import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const Template = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { title } = post.frontmatter;

  return (
    <>
      <Layout>
        <div className="blogPost">
          <div className="blogTemplate">
            <h1 className="blogTemplate-title">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Template;

export const postQuery = graphql`
  query BlogPost($path_variable: String!) {
    markdownRemark(frontmatter: { path: { eq: $path_variable } }) {
      frontmatter {
        author
        date
        title
        path
      }
      html
    }
  }
`;

export const Head = ({ data }) => {
  const post = data.markdownRemark;
  const { title, description, path } = post.frontmatter;
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content="Programming, Graphics, Computer Science" />
      <meta name="robots" content="index" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://www.anwarellablog.me${path}`} />
      <title>{title}</title>
    </>
  );
};
