import gestureImages from "@/utils/gestureImages";
import type { GestureImage } from "@/utils/gestureImages";
import { useEffect, useState } from "react";

const useGestures = () => {
  const randomGesture = () => {
    const randomIndex = Math.floor(Math.random() * gestureImages.length);
    return gestureImages[randomIndex];
  };

  const initialGesture = randomGesture();
  const [gesture, setGesture] = useState<GestureImage | undefined>(
    initialGesture
  );

  const [prevGesture, setPrevGesture] = useState<GestureImage | undefined>(
    initialGesture
  );

  const newGesture = () => {
    if (gesture) setPrevGesture(gesture);
    setGesture(randomGesture());
  };

  const reset = () => setGesture(undefined);

  return [prevGesture, gesture, { newGesture, reset, setGesture }] as const;
};

export default useGestures;
