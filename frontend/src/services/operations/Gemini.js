import toast from "react-hot-toast";
import {
  setLoading,
  botConversations,
  addUserPrompt,
  setError,
} from "../../slices/GeminiSlice";
import { apiConnector } from "../apiConnector";
import { geminiEndpoints } from "../api";
import { setLoading } from "../../slices/GardenSlice";

export const geminiChat = (image, message, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Processing...");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) {
        formData.append("image", image);
      } else {
        formData.append("image", null);
      }
      const response = await apiConnector(
        "POST",
        geminiEndpoints.TALK_TO_GEMINI_API,
        { formData },
        {Authorization: `Bearer ${token}`},
      );
      dispatch(addUserPrompt(message));
      dispatch(botConversations(response.data));
      toast.success("Message sent successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error("Error sending message.");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
