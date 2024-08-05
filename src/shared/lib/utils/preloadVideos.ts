// preloadVideos.ts
export const preloadVideos = (urls: string[]): Promise<void[]> => {
    return Promise.all(
      urls.map((url) =>
        new Promise<void>((resolve) => {
          const video = document.createElement('video');
          video.src = url;
          video.preload = 'auto';
          video.onloadeddata = () => resolve();
        })
      )
    );
  };
  