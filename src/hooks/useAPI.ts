import axios from "@/utils/axios";
import type { GestureResponse } from "@/types";

const useAPI = () => {
  const sendImage = async (
    image: string,
    expectedGesture: string
  ): Promise<string> => {
    const result = await axios.post<string>(
      "/gestures",
      {
        expected_gesture: expectedGesture,
        gesture: image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  };

  const gestureFinished = async (
    gestureId: string
  ): Promise<GestureResponse> => {
    const result = await axios.get<GestureResponse>(`/gestures/${gestureId}`);
    return result.data;
  };

  return { sendImage, gestureFinished };
};

export default useAPI;
