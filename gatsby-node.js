/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/blogTemplate.js');
  const blogListTemplate = path.resolve(
    'src/templates/blog-posts-list-template.js'
  );
  const aboutTemplate = path.resolve('src/templates/about.js');

  const res = await graphql(`
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
  `);

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
  const files = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "files" } }) {
        edges {
          node {
            id
            name
            publicURL
          }
        }
      }
    }
  `);

  createPage({
    path: '/About',
    component: aboutTemplate,
    context: {
      resume: files.data.allFile.edges.filter(
        (e) => e.node.name === 'Resume'
      )[0].node.publicURL,
      face: files.data.allFile.edges.filter((e) => e.node.name === 'face')[0]
        .node.publicURL,
    },
  });
};
