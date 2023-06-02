import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '@components/Layout';
import Post from '@components/Post';

const Template = ({ data, pageContext }) => {
  const isFirst = pageContext.currentPage === 1;
  const isLast = pageContext.currentPage === pageContext.numPages;
  const prevPage = pageContext.currentPage - 1 === 1 ? '/' : (pageContext.currentPage - 1).toString();
  const nextPage = (pageContext.currentPage + 1).toString();

  return (
    <Layout>
      {data.allMarkdownRemark.edges.map((post) => {
        const { title, author, date, description, path } = post.node.frontmatter;

        return (
          <Post
            title={title}
            author={author}
            date={date}
            description={description}
            key={`${date}__${title}`}
            path={path}
          />
        );
      })}
      {!isFirst && (
        <Link to={prevPage} rel="prev" id="prev">
          Next Page →
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel="next" id="next">
          ← Previous Page
        </Link>
      )}
    </Layout>
  );
};

export default Template;

export const AllPostsQuery = graphql`
  query AllPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { frontmatter: { sortDate: DESC } }, limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            date
            title
            description
            author
            path
            sortDate
          }
        }
      }
    }
  }
`;

export const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="description" content="Programming, Computer Graphics, Grad School, by Anwar Haredy" />
      <meta name="keywords" content="Programming, Graphics, Computer Science" />
      <meta name="robots" content="index" />
      <meta property="og:title" content="Anwar's Blog" />
      <meta property="og:description" content="Programming, Computer Graphics, Grad School, by Anwar Haredy" />
      <meta property="og:image" content="https://www.example.com/image.jpg" />
      <meta property="og:url" content="https://www.anwarellablog.me" />
      <link rel="icon" href="/images/favicon.ico" />
      <title>Anwar's Blog</title>
    </>
  );
};
