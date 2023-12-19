import React from "react";
import Layout from "@components/Layout";
import Body from "@components/Body";
import { Link } from "gatsby";
import { IconContext } from "react-icons";

const AllPosts = ({ pageContext }) => {
  return (
    <Layout>
      <IconContext.Provider value={{ size: "2em" }}>
        <div className="container container-list">
          <div className="all-posts">
            <h1 className="all-posts-title">All Posts</h1>
            <div className="all-posts-list">
              {pageContext.posts.map((edge, index) => (
                <div className="all-posts-list-item" key={index}>
                  <Link to={edge.node.frontmatter.path}>
                    <div>{edge.node.frontmatter.title} </div>
                  </Link>
                  <div>
                    {" "}
                    &nbsp;- <i>{edge.node.frontmatter.date}</i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </Layout>
  );
};

export default AllPosts;
export function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <link rel="icon" href="/images/favicon.ico" />
      <title>All Posts</title>
    </>
  );
}
