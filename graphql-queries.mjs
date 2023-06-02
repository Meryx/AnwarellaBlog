export const allMarkdownRemarkQuery = `
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
`;

export const allFileQuery = `
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
`;

export const allPostsQuery = `
query AllBlogPosts($skip: Int!, $limit: Int!) {
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
