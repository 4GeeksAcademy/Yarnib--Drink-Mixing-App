import React, { useRef, useEffect } from 'react';

const blogPostStyle = {
  marginBottom: '20px', // Add margin to separate blog posts
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center contents horizontally
  textAlign: 'center', // Center text horizontally
  border: '3px solid #ccc', // Add a border to create a box
  padding: '10px', // Add padding for spacing
  fontWeight: 'bold', // Make the box bold
  maxWidth: '40%', // Set the maximum width to 100% to fit the image width
  margin: '0 auto', // Center the container horizontally
};

const imageStyle = {
  display: 'block',
  margin: '0 auto', // Center horizontally
  maxWidth: '100%', // Set the maximum width to 100% to fit the container
};

const contentStyle = {
  textAlign: 'center', // Align text to the center
  margin: '1em', // Add some margin for spacing
  maxWidth: '100%', // Set the maximum width to 100% to fit the container
};

const BlogPost = ({ post }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.width;
      const container = document.querySelector('.container');
      container.style.maxWidth = `${imageWidth}px`;
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
