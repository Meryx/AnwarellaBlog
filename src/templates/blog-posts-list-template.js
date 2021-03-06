import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import "./blog-posts-list-template.css";
import { Helmet } from "react-helmet"
import Header from '../components/Header';

export default function Template({ data, pageContext }) {
  const isFirst = pageContext.currentPage === 1;
  const isLast = pageContext.currentPage === pageContext.numPages
  const prevPage = pageContext.currentPage  - 1 === 1 ? "/" : (pageContext.currentPage  - 1).toString()
  const nextPage = (pageContext.currentPage  + 1).toString()


  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Anwarellablog</title>
      </Helmet>
      <div className="blogs">
        <Header title="Blogs by Anwar" />

        <div>
          {

            data.allMarkdownRemark.edges.map(post => {
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
              )
            })
          }
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
        </div>

      </div>
    </Layout>
  )
};

export const AllBlogsQuery = graphql`
  query AllBlogPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___sortDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
`
