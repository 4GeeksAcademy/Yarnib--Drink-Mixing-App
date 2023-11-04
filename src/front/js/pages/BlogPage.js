import React from 'react';
import BlogList from './BlogList';

const BlogPage = () => {
  return (
    <div className="blog-page">
      {/* Center the ShotsHeader4k image horizontally under the navbar */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={ShotsHeader1080}
          alt="Shots Header"
          style={{ width: '70%', height: 'auto', margin: 0, padding: 0 }}
        />
      </div>

      <BlogList />
    </div>
  );
};

export default BlogPage;
