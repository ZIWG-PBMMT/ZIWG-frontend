import { useMemo, useState } from "react";
import { default as RWebcam } from "react-webcam";
import webcamStyles from "@/styles/Webcam.module.css";
import gestureStyles from "@/styles/Gesture.module.css";
import { useGestures, useAPI, useWebcam } from "@/hooks";
import { GestureResponse } from "@/types";
import "@/styles/App.css";

const videoConstraints = {
  width: 420,
  height: 420,
  facingMode: "user",
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  const [
    prevGesture,
    gesture,
    { newGesture, reset: resetGesture, setGesture },
  ] = useGestures();

  const [webcamRef, { image, capture, reset: resetCapture }] = useWebcam();

  const { sendImage, gestureFinished } = useAPI();
  const [gestureState, setGestureState] = useState<GestureResponse>(null);

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

      <div className={gestureStyles.cat}>
        {(appState === "capture" || appState === "preview") && (
          <>
            <p> Pokaż ten gest </p>
            <img src={`/signs/${gesture?.name}`} alt="cat image" />
          </>
        )}
        {loading && <div className="lds-dual-ring"></div>}
        {appState === "response" &&
          (gestureState ? (
            <p className={gestureStyles.good}>Right</p>
          ) : (
            <p className={gestureStyles.bad}>Wrong</p>
          ))}
      </div>
    </main>
  );
}

export default App;
