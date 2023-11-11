import React from 'react';
import BlogPost from './BlogPost';
import whiskeyImage from '../../img/blogimages/whiskeyImage.jpg';
import tequila from '../../img/blogimages/tequila.jpg';
import beerImage from '../../img/blogimages/beer.jpg';
import banner4k from '../../img/banner4k.jpg';

const homepageStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  justifyContent: 'start',
  alignItems: 'start',
  top:"200px",
  left:"0px",
  margin:"0"
};

const sidebarStyle = {
  padding: '0px',
  width: '250px',
  height: '840px',
  overflowY: 'auto',
  position:"absolute",
  
  top:"160px",
  left:"0",
  margin:"0"

};

const contentStyle = {
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  flex: '1',
  maxWidth: '100%',
  paddingRight: '0px', 
  position:"absolute",
  top:"180px",
  right:"0",
};

const centerTitleStyle = {
  textAlign: 'center',
};

const Home = () => {
  const blogData = [
    {
      id: 1,
      title: 'The Origins of Whiskey',
      year: 'October 20, 2023',
      content: "Whiskey, the golden elixir with a rich and storied history, has its origins deeply rooted in the annals of time. ",
      imageUrl: whiskeyImage,
    },
    {
      id: 2,
      title: 'Exploring the World of Tequila',
      year: 'October 06, 2023',
      content: "Venture into the captivating world of Tequila, a spirit with a fascinating heritage and a taste that embodies the essence of Mexico. ",
      imageUrl: tequila,
    },
    {
      id: 3,
      title: 'The Art of Brewing Beer',
      year: 'September 17, 2023',
      content: "The art of brewing beer is a timeless craft that has been cherished for millennia, dating back to the ancient Sumerians and Egyptians who first documented their beer-making recipes.",
      imageUrl: beerImage,
    },
  
];
  return (
    <div style={homepageStyle}>
      <div style={sidebarStyle}>
        <h2 style={{ textAlign: 'center' }}>Latest Stories</h2>
        {blogData.slice(0, 5).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
        <a href="/BlogPage" style={{ display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
          Read More
        </a>
      </div>
      <div style={contentStyle}>
        <a href="/sign-up">
          <img
            src={banner4k}
            alt="banner 4k"
            style={{
              width: '70%',
              height: 'auto',
              alignSelf: 'flex-end',
              cursor: 'pointer',
              maxWidth: '70%',
              
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default Home;