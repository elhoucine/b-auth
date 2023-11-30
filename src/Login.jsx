import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import logo from "./assets/logo.svg";
import Camera from './Camera';
import 'react-toastify/dist/ReactToastify.css';

const CDN_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs';
const TACKINGJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/tracking-min.js`;
const FACEJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/data/face-min.js`;
const LOGIN_DELAY_SECONDS = 10;
const SUCCESS_MSG = 'Login success, redirecting to hello page!';
const ERROR_LOGIN_MSG = 'Login failed, no face detected.';

function Login({ onLogin }) {
  let tracker;
  const webcamRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

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
        trackFace();
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

  const handleOnRetry = () => {
    document.location.reload();
  }

  const trackFace = () => {
    tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracker.on('track', function(event) {
      if (event.data.length > 0 && !isFaceDetected) {
        setIsFaceDetected(true);
        tracker.removeAllListeners();
        toast.success(SUCCESS_MSG);
        // allow notification sometime before redirecting.
        setTimeout(() => {
          onLogin(true);
        }, 1000 * 3)
      }
    });

    tracking.track(webcamRef.current, tracker, { camera: true });
    tryLoginFor();
  }

  const tryLoginFor = () => {
    setTimeout(() => {
      // ignore failure if user is logging-in.
      if (!isFaceDetected) {
        tracker?.removeAllListeners?.();
        setIsFaceDetected(true);
        toast.error(ERROR_LOGIN_MSG);
        setIsCameraOn(false);
      }
    }, LOGIN_DELAY_SECONDS * 1000);
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
      <span style={{ marginRight: "10px" }}>Face login by</span>
        <img style={{ width: "100px" }} src={logo} alt="" />
      </div>
      {isCameraOn
        ? <Camera ref={webcamRef}/>
        : <button style={{ backgroundColor: "#ff6b40" }} onClick={handleOnRetry}>Re-try</button>
      }
    </>
  )
}

export default Login
