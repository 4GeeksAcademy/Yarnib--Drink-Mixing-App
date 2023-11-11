import React from 'react';
import BlogList from './BlogList';
import ShotsHeader1080 from "../../img/Headerimages/ShotsHeader1080.jpg";

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h1 style={{ textAlign: 'center' }}>Shots</h1>
      <BlogList />
      
    </div>
  );
};

export default BlogPage;
