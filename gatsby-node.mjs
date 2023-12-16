import path from "path";
import {
  allMarkdownRemarkQuery,
  allFileQuery,
  allPostsQuery,
} from "./graphql-queries.mjs";

export const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const home = path.resolve("src/templates/home.js");
  const postTemplate = path.resolve("src/templates/blogTemplate.js");
  const aboutTemplate = path.resolve("src/templates/about.js");

  const res = await graphql(allMarkdownRemarkQuery);
  if (res.errors) {
    return Promise.reject(res.errors);
  }

  const posts = res.data.allMarkdownRemark.edges;
  posts.forEach((edge, index) => {
    let prevPost =
      index < posts.length - 1
        ? posts[index + 1].node.frontmatter.path
        : undefined;
    let nextPost =
      index > 0 ? posts[index - 1].node.frontmatter.path : undefined;

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
      component: home,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  const files = await graphql(allFileQuery);

  createPage({
    path: "/about",
    component: aboutTemplate,
    context: {
      resume: files.data.allFile.edges.filter(
        (e) => e.node.name === "Resume"
      )[0].node.publicURL,
      face: files.data.allFile.edges.filter((e) => e.node.name === "face")[0]
        .node.publicURL,
    },
  });

  const allPosts = await graphql(allPostsQuery, { limit: 1000, skip: 0 });

  createPage({
    path: "/all-posts",
    component: path.resolve("src/templates/all-posts-template.js"),
    context: {
      posts: allPosts.data.allMarkdownRemark.edges,
    },
  });
};
