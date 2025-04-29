import toast from "react-hot-toast";
import {
setLoading,
setLike,
setComment,
deleteComment,
} from "../../slices/CommunitySlice";
import { apiConnector } from "../apiConnector";
import { postEndpoints } from "../api";

export const addLike = (postId,token,user) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", postEndpoints.LIKE_POST_API, { postId },
            {Authorization: `Bearer ${token}`},
            );
            console.log("SET LIKE API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setLike(postId,user._id));
        } catch (error) {
            console.log("SET LIKE API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export const removeLike = (postId,token,user) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", postEndpoints.UNLIKE_POST_API, { postId },
            {Authorization: `Bearer ${token}`},
            );
            console.log("REMOVE LIKE API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setLike(postId,user._id));
        } catch (error) {
            console.log("REMOVE LIKE API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export const addTheComment = (postId, comment,token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", postEndpoints.ADD_COMMENT_API, { postId, comment },
            {Authorization: `Bearer ${token}`},
            );
            console.log("ADD COMMENT API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setComment(postId,response.data.comment));
        } catch (error) {
            console.log("ADD COMMENT API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
export const removeTheComment = (postId, commentId,token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", postEndpoints.DELETE_COMMENT_API,
            { postId, commentId },
            {Authorization: `Bearer ${token}`},
            );
            console.log("REMOVE COMMENT API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(deleteComment(postId,commentId));
        } catch (error) {
            console.log("REMOVE COMMENT API ERROR............", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
