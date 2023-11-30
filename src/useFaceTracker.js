import { useEffect, useState } from "react";

const CDN_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs';
const TACKINGJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/tracking-min.js`;
const FACEJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/data/face-min.js`;

const useFaceTracker = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // using a node_module to track faces would have been easier,
    // for the sake of this challenge I am loading an external script instead.
    let scriptsLoaded = 0;
    const script1 = document.createElement('script');
    const script2 = document.createElement('script');
    script1.src = TACKINGJS_CDN;
    script2.src = FACEJS_CDN;

    // Make sure the two scripts are loaded. 
    const initTracking = () => {
      scriptsLoaded++;
      if (scriptsLoaded === 2) {
        setIsReady(true);
      }
    }

    script1.onload = initTracking
    script2.onload = initTracking;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return {
    isReady,
    tracking: window.tracking
  }
};

export default useFaceTracker;
