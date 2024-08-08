import React, { useState } from 'react';
import cls from './GameBackground.module.scss';

interface GameBackgroundProps {
  level?: number;
}

export const GameBackground: React.FC<GameBackgroundProps> = (props) => {
  const { level } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const gifSrc = `https://tap-cdn.teleton.app/animations/level_${level ?? 1}.gif`;
  const placeholderSrc = `/levels/level_${level ?? 1}.png`;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className={cls.imageContainer}>
      { !isImageLoaded && <img src={placeholderSrc} alt="Loading" className={cls.placeholderImage} />}
      <img
        src={gifSrc}
        alt={`Level ${level}`}
        onLoad={handleImageLoad}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
        className={cls.placeholderImage}
      />
    </div>
  );
};


// import React, { useRef, useEffect, useState } from 'react';
// import cls from './GameBackground.module.scss';

// interface GameBackgroundProps {
//   level?: number;
// }

// export const GameBackground: React.FC<GameBackgroundProps> = (props) => {
//   const { level } = props;
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoSrc = `/animations/level_${level ?? 1}.mp4`;
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 2.0;
//       videoRef.current.onloadeddata = () => {
//         setIsVideoLoaded(true);
//         videoRef.current?.play();
//       };
//     }
//   }, [videoSrc]);

//   return (
//     <div className={cls.videoContainer}>
//       { !isVideoLoaded && <img src={`/levels/level_${level ?? 1}.png`} alt="Loading..." className={cls.placeholderImage} />}
//       <video
//         ref={videoRef}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className={cls.video}
//         preload="auto"
//         style={{ display: isVideoLoaded ? 'block' : 'none' }}
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>
//     </div>
//   );
// };
