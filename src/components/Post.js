import React from 'react';
import { Link } from 'gatsby';

const Post = ({ title, author, date, description, path }) => (
  <div className="post">
    <Link to={path}>
      <h3 className="post-title">{title}</h3>{' '}
    </Link>
    <p className="post-description">{description}</p>
    <p className="post-written-by">{date}</p>
  </div>
);

export default Post;
