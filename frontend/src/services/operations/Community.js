import toast from "react-hot-toast";
import {
  setCommunities,
  setCurrentCommunity,
  setLoading,
  setMembers,
  setPosts,
  addCommunity,
  addMember,
  removeCommunity,
  removeMember,
  addPost,
  removePost,
} from "../../slices/CommunitySlice";
import { apiConnector } from "../apiConnector";
import { communityEndpoints } from "../api";
import { useSelector } from "react-redux";

export const getAllCommunities = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        communityEndpoints.GET_ALL_COMMUNITIES_API,
        null,
        { Authorization: `Bearer ${token}` }
      );
      console.log(
        "GET ALL COMMUNITIES API RESPONSE............",
        response.data
      );
      if (!response.data.success) {
        throw new Error(response.message);
      }
      toast.dismiss(toastId);
      dispatch(setCommunities(response.data.communities));
    } catch (error) {
      console.log("GET ALL COMMUNITIES API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const getCommunity = (communityId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.GET_COMMUNITY_API,
        { communityId }
      );
      console.log("GET COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      dispatch(setCurrentCommunity(response.data.community));
    } catch (error) {
      console.log("GET COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const getMembers = (communityId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.GET_MEMBERS_API,
        { communityId }
      );
      console.log("GET MEMBERS API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      dispatch(setMembers(response.data.members));
    } catch (error) {
      console.log("GET MEMBERS API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const getPosts = (communityId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.GET_POSTS_API,
        { communityId }
      );
      console.log("GET POSTS API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      dispatch(setPosts(response.data.posts));
    } catch (error) {
      console.log("GET POSTS API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const createCommunity = (name, description, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log(name, description);
      const response = await apiConnector(
        "POST",
        communityEndpoints.CREATE_COMMUNITY_API,
        { name, description },
        { Authorization: `Bearer ${token}` }
      );
      console.log("CREATE COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Community created successfully");
      dispatch(addCommunity(response.data.community));
    } catch (error) {
      console.log("CREATE COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const joinCommunity = (communityId,token,user) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.JOIN_COMMUNITY_API,
        { communityId },
        { Authorization: `Bearer ${token}` }
      );
      console.log("JOIN COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Joined community successfully");
      dispatch(addMember(user._id));
    } catch (error) {
      console.log("JOIN COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const leaveCommunity = (communityId,token,user) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        communityEndpoints.LEAVE_COMMUNITY_API,
        { communityId },
        { Authorization: `Bearer ${token}` }
      );
      console.log("LEAVE COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Left community successfully");
      dispatch(removeMember(user._id));
    } catch (error) {
      console.log("LEAVE COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const deleteCommunity = (communityId, creatorID, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log("got here");
      const response = await apiConnector(
        "DELETE",
        communityEndpoints.DELETE_COMMUNITY_API,
        { communityId, creatorID },
        { Authorization: `Bearer ${token}` }
      );
      console.log("DELETE COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Community deleted successfully");
      dispatch(removeCommunity(communityId));
      dispatch(setCurrentCommunity(null));
      dispatch(setPosts([]));
      dispatch(setMembers([]));
    } catch (error) {
      console.log("DELETE COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const updateCommunity = (communityId, name, description) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.UPDATE_COMMUNITY_API,
        { communityId, name, description }
      );
      console.log("UPDATE COMMUNITY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Community updated successfully");
      dispatch(setCurrentCommunity(response.data.community));
    } catch (error) {
      console.log("UPDATE COMMUNITY API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const addThePost = (communityId, description, image) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("communityId", communityId);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      const response = await apiConnector(
        "POST",
        communityEndpoints.ADD_POST_API,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("ADD POST API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Post created successfully");
      dispatch(addPost(response.data.post));
    } catch (error) {
      console.log("ADD POST API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};
export const deletePost = (postId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        communityEndpoints.DELETE_POST_API,
        { postId }
      );
      console.log("DELETE POST API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Post deleted successfully");
      dispatch(removePost(postId));
    } catch (error) {
      console.log("DELETE POST API ERROR............", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};
