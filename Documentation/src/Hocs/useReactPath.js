import React from 'react';

const useReactPath = () => {
  const [path, setPath] = React.useState(window.location.href);
  const listenToPopstate = () => {
    const winPath = window.location.href;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);
  return path;
};

export default useReactPath;
