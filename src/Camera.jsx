import { useEffect, forwardRef } from 'react';
import { toast } from 'react-toastify';

const ERROR_CAMERA_PERMISSION = 'Camera permission denied.';

const Camera = (props, ref) => {
  const { width = 640, height = 480 } = props;
  const videoRef = ref;

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        toast.error(ERROR_CAMERA_PERMISSION);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  return (
    <video ref={videoRef} width={width} height={height} autoPlay playsInline />
  );
};

export default forwardRef(Camera);
