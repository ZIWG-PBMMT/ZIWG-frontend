import { useRef, useState } from "react";
import Webcam from "react-webcam";

const useWebcam = () => {
  const webcamRef = useRef<Webcam>(null);

  const [image, setImage] = useState<string | null>(null);

  const capture = () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc);
  };

  const reset = () => setImage(null);

  return [webcamRef, { image, capture, reset }] as const;
};

export default useWebcam;
