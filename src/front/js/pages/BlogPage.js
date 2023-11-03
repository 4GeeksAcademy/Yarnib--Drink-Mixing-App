import React from 'react';
import BlogList from './BlogList';
import ChatBot from './ChatBot';
import ShotsHeader1080 from "../../img/Headerimages/ShotsHeader1080.jpg";

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

      {/* Render the ChatBot component here, inside the return statement */}
      <ChatBot />
    </div>
  );
};

export default BlogPage;
