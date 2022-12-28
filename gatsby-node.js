/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/blogTemplate.js');
  const blogListTemplate = path.resolve(
    'src/templates/blog-posts-list-template.js'
  );

  return graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { sortDate: DESC } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then((res) => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }
    const posts = res.data.allMarkdownRemark.edges;
    posts.forEach((edge, index) => {
      let prevPost = undefined;
      let nextPost = undefined;
      if (index > 0) {
        nextPost = posts[index - 1].node.frontmatter.path;
      }

      if (index < posts.length - 1) {
        prevPost = posts[index + 1].node.frontmatter.path;
      }
      createPage({
        path: edge.node.frontmatter.path,
        component: postTemplate,
        context: {
          nextPost: nextPost,
          prevPost: prevPost,
          index: index,
          post: posts[index].node,
          path_variable: edge.node.frontmatter.path,
        },
      });
    });

    const postsPerPage = 3;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};
