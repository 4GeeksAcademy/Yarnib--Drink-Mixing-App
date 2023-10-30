import React, { useState, useEffect } from 'react';
import ChatBot from './ChatBot';

function Social() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [originalWidth, setOriginalWidth] = useState('1280px');
  const [originalHeight, setOriginalHeight] = useState('800px');
  const [customWidth, setCustomWidth] = useState(originalWidth);
  const [customHeight, setCustomHeight] = useState(originalHeight);

  const iframeRef = React.createRef();

  const enterFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      setOriginalWidth(iframe.style.width);
      setOriginalHeight(iframe.style.height);

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
    setIframeSize(customWidth, customHeight); // Set to the custom size
  };

  const setIframeSize = (width, height) => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.style.width = width;
      iframe.style.height = height;
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(
        !!document.fullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative' }}>
      <iframe
  ref={iframeRef}
  title="Social Content"
  src="https://www.spatial.io/s/Cheers-Home-Bar-Pro-Lounge-65399d0415435224fad00916"
  allow="camera;microphone"
  width={isFullScreen ? '100%' : customWidth}
  height={isFullScreen ? '100vh' : customHeight}
></iframe>
        {!isFullScreen && (
          <button
            onClick={isFullScreen ? exitFullscreen : enterFullscreen}
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        )}
      </div>

      {/* Render the ChatBot component */}
      <ChatBot />
    </div>
  );
}

export default Social;
