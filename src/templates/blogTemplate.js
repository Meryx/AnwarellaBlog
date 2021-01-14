import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import "./blogTemplate.css";
import { Helmet } from "react-helmet";
import Header from '../components/Header';

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
      </Helmet>
      <div className="blogPost">

        <Header title="Blogs by Anwar"/>
        <div className='blogTemplate'>
          <h1 className="blogTemplate-title">{ title }</h1>
          <p className='blogTemplate-posted-by'>Posted by { author } on { date }</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {nextPost && (
            <Link to={nextPost} rel="next" id="nextPost">
               Next Post →
            </Link>
          )}
          {prevPost && (
            <Link to={prevPost} rel="prev" id="prevPost">
              ← Previous Post
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
