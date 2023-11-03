import React, { useState } from 'react';
import blogData from './blogdata'; // Relative to the current directory
import BlogPost from './BlogPost'; // Relative to the current directory



const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center', // Center the button horizontally
};

const BlogList = () => {
  const [visiblePosts, setVisiblePosts] = useState(10);

  const loadMorePosts = () => {
    setVisiblePosts(visiblePosts + 10);
  };

  return (
    <div className="blog-list" style={{ margin: 0 + 'px auto', maxWidth: 40 + '%', color: 'white' }}>
      {blogData.slice(0, visiblePosts).map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      <div style={buttonContainerStyle}>
        {visiblePosts < blogData.length && (
          <button onClick={loadMorePosts}>See More</button>
        )}
      </div>
    </div>
  );
};

export default BlogList;