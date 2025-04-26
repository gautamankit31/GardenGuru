import toast from "react-hot-toast";
import {
setLoading,
setLike,
addComment,
removeComment
} from "../../slices/CommunitySlice";
import { apiConnector } from "../apiConnector";
import endpoints from "../api";
import { useSelector } from "react-redux";

export const addLike = (postId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.SET_LIKE_API, { postId });
            console.log("SET LIKE API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            const {user}= useSelector((state) => state.profile);
            dispatch(setLike(response.data.postId,user));
        } catch (error) {
            console.log("SET LIKE API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export const addComment = (postId, comment) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.ADD_COMMENT_API, { postId, comment });
            console.log("ADD COMMENT API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(addComment(response.data.postId, response.data.comment));
        } catch (error) {
            console.log("ADD COMMENT API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export const removeComment = (postId, commentId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.REMOVE_COMMENT_API, { postId, commentId });
            console.log("REMOVE COMMENT API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(removeComment(response.data.postId, response.data.commentId));
        } catch (error) {
            console.log("REMOVE COMMENT API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
