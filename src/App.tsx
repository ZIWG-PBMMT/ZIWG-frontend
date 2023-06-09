import { useMemo, useRef, useState } from "react";
import "@/styles/App.css";
import { axios } from "@/utils";

import { default as RWebcam } from "react-webcam";
import webcamStyles from "@/styles/Webcam.module.css";
import catStyles from "@/styles/CatImage.module.css";
import useGestures from "./hooks/useGestures";
import useAPI from "./hooks/useAPI";
import useWebcam from "./hooks/useWebcam";
import { GestureResponse } from "./types";

const videoConstraints = {
  width: 420,
  height: 420,
  facingMode: "user",
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  //from webcam

  const [
    prevGesture,
    gesture,
    { newGesture, reset: resetGesture, setGesture },
  ] = useGestures();

  const [webcamRef, { image, capture, reset: resetCapture }] = useWebcam();

  const { sendImage, gestureFinished } = useAPI();
  const [gestureState, setGestureState] = useState<boolean | null>(null);

  const submit = async () => {
    if (!image || !gesture?.expectedGesture) return;

    const id = await sendImage(image, gesture.expectedGesture);
    resetCapture();
    resetGesture();

    waitForFinish(id);
  };

  const waitForFinish = async (id: string) => {
    setLoading(true);
    setGestureState(null);

    let response = null as GestureResponse;
    do {
      await new Promise((resolve) => setTimeout(resolve, 500));
      response = await gestureFinished(id);
    } while (response === null);

    setGestureState(response);
    setLoading(false);
  };

  // const [appState, setAppState] = useState<"capture" | "preview" | "response">("capture")
  const appState = useMemo(() => {
    if (!image && gesture && !loading) return "capture";
    if (image && gesture) return "preview";
    if (!image && gestureState !== null) return "response";
  }, [image, gesture, gestureState, loading]);

  return (
    <main>
      <div className={webcamStyles.webcam}>
        <div className={webcamStyles["webcam__container"]}>
          <RWebcam
            audio={false}
            height={420}
            screenshotFormat="image/jpeg"
            width={420}
            videoConstraints={videoConstraints}
            ref={webcamRef}
            mirrored={true}
          />
          {image && <img src={image} alt="capture" />}
        </div>
        <div className={webcamStyles["webcam__footer"]}>
          {appState === "capture" && (
            <button onClick={capture}> Capture photo </button>
          )}
          {appState === "preview" && (
            <>
              <button onClick={submit}> Submit </button>
              <button onClick={resetCapture}> Try again </button>
            </>
          )}
          {appState === "response" && (
            <>
              <button onClick={newGesture}> New gesture </button>
              <button onClick={() => setGesture(prevGesture)}>Try again</button>
            </>
          )}
        </div>
      </div>

      <div className={catStyles.cat}>
        {(appState === "capture" || appState === "preview") && (
          <>
            <p> Pokaż ten gest </p>
            <img
              src={`${import.meta.env.VITE_APP_URL}/signs/${gesture?.name}`}
              alt="cat image"
            />
          </>
        )}
        {loading && <div className="lds-dual-ring"></div>}
        {appState === "response" &&
          (gestureState ? (
            <p className={catStyles.good}>Right</p>
          ) : (
            <p className={catStyles.bad}>Wrong</p>
          ))}
      </div>
    </main>
  );
}

export default App;
