import React from "react";
import { graphql, Link } from "gatsby";
import Nav from '../components/Nav';
import Layout from "../components/Layout";
import "./blogTemplate.css";

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Template({ data, pageContext }) {
  const post = data.markdownRemark;
  const { title, author, date } = post.frontmatter;
  const nextPost = pageContext.nextPost;
  const prevPost = pageContext.prevPost;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ title }</title>
        <link rel="canonical" href={`https://anwarellablog.me/`${title}} />
      </Helmet>
      <div className="blogPost">
        <div className="header">
          <h1>Blogs by Anwar</h1>
          <Nav />
        </div>
        <div className='blogTemplate'>
          <h1 className="blogTemplate-title">{ title }</h1>
          <p className='blogTemplate-posted-by'>Posted by { author } on { date }</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {nextPost && (
            <Link to={nextPost} rel="prev" id="prevPost">
              ← Previous Post
            </Link>
          )}
          {prevPost && (
            <Link to={prevPost} rel="next" id="nextPost">
              Next Post →
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
};

export const postQuery = graphql`
  query BlogPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path }}) {
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
