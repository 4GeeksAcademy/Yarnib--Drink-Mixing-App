import React, { useRef, useEffect } from 'react';

const blogPostStyle = {
  marginBottom: '20px', // Add margin to separate blog posts
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  textAlign: 'center', 
  border: '3px solid #ccc', 
  padding: '10px', 
  fontWeight: 'bold', 
  margin: '0 auto', 
};

const imageStyle = {
  display: 'block',
  margin: '0 auto', 
  maxWidth: '100%', 
};

const contentStyle = {
  textAlign: 'center', 
  margin: '1em', 
  maxWidth: '100%', 
};

const BlogPost = ({ post }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.width;
      const container = document.querySelector('.container');
    }
  }, []);

  return (
    <div style={blogPostStyle}>
      <div style={containerStyle}>
        <h2>{post.title}</h2>
        <p>Date: {post.year}</p>
        <img ref={imageRef} src={post.imageUrl} alt={post.title} style={imageStyle} />
        <div style={contentStyle}>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
