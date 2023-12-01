import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import logo from "./assets/logo.svg";
import useFaceTracker from './useFaceTracker';
import Camera from './Camera';

const LOGIN_FAILURE_DELAY_SECONDS = 10;
const LOGIN_SUCCESS_DELAY_SECONDS = 3.5;
const SUCCESS_MSG = 'Login success, redirecting to hello page!';
const ERROR_LOGIN_MSG = 'Login failed, no face detected.';

function Login({ onLogin }) {
  let tracker;
  const webcamRef = useRef(null);
  const isFaceDetectedRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { isReady, tracking } = useFaceTracker();
  isFaceDetectedRef.current = isFaceDetected;

  useEffect(() => {
    if (isReady) {
      trackFace();
    }
  }, [isReady]);

  const trackFace = () => {
    tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracker.on('track', function (event) {
      if (event.data.length > 0 && !isFaceDetected) {
        setIsFaceDetected(true);
        tracker.removeAllListeners();
        toast.success(SUCCESS_MSG);
        // allow notification sometime before redirecting.
        setTimeout(() => {
          onLogin(true);
        }, LOGIN_SUCCESS_DELAY_SECONDS * 1000)
      }
    });

    tracking.track(webcamRef.current, tracker, { camera: true });
    tryLoginFor();
  }

  const tryLoginFor = () => {
    setTimeout(() => {
      // ignore failure if user is logging-in.
      if (!isFaceDetectedRef.current) {
        tracker?.removeAllListeners?.();
        setIsFaceDetected(true);
        toast.error(ERROR_LOGIN_MSG);
        setIsCameraOn(false);
      }
    }, LOGIN_FAILURE_DELAY_SECONDS * 1000);
  };

  const handleOnRetry = () => {
    document.location.reload();
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <span style={{ marginRight: "10px" }}>Face login by</span>
        <img style={{ width: "100px" }} src={logo} alt="" />
      </div>
      {isCameraOn
        ? <Camera ref={webcamRef} />
        : <button style={{ backgroundColor: "#ff6b40" }} onClick={handleOnRetry}>Re-try</button>
      }
    </>
  )
}

export default Login
