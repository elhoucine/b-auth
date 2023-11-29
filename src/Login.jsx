import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Webcam from "react-webcam";

const CDN_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs';
const TACKINGJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/tracking-min.js`;
const FACEJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/data/face-min.js`;

function Login({ onLogin }) {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const script1 = document.createElement('script');
    const script2 = document.createElement('script');
    script1.src = TACKINGJS_CDN;
    script2.src = FACEJS_CDN;

    script1.onload = () => {
      script2.onload = () => {
        trackFace();
      };
    }

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const trackFace = () => {
    const tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracker.on('track', function(event) {
      if (event.data.length === 0) {
        console.log('No face');
      } else {
        console.log('Face detected');
        setIsCameraOn(false);
        onLogin(true);
        tracker.removeAllListeners();
      }
    });

    tracking.track(webcamRef.current.video, tracker, { camera: true });
  }

  return (
    <>
      <Helmet>
        <title>Login page!</title>
        <meta name='description' content='You are about to login biometrically.' />
      </Helmet>
      <h1>CAMERA</h1>
      {isCameraOn && <Webcam ref={webcamRef}/>}
    </>
  )
}

export default Login
