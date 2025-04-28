import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    communities: [],
    currentCommunity: null,
    members:[],
    posts:[],
    isLoading: false,
    error: null,
}

const communitySlice= createSlice({
    name: 'community',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCommunities: (state, action) => {
            state.communities = action.payload;
            state.currentCommunity=state.communities[0];
            
        },
        addCommunity: (state, action) => {
            state.communities.push(action.payload);
        },
        removeCommunity: (state, action) => {
            const communityId = action.payload;
            state.communities = state.communities.filter(community => community._id !== communityId);
        },
        setCurrentCommunity: (state, action) => {
            state.currentCommunity = action.payload;
        },
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        addMember: (state, action) => {
            state.members.push(action.payload);
        },
        removeMember: (state, action) => {
            const memberId = action.payload;
            state.members = state.members.filter(member => member._id !== memberId);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post._id !== postId);
        },
        setLike:(state, action) => {
            const { postId, userId } = action.payload;
            const postIndex = state.posts.findIndex(post => post._id === postId);
            if (postIndex !== -1) {
                const post = state.posts[postIndex];
                const likeIndex = post.likes.findIndex(like => like.userId === userId);
                if (likeIndex !== -1) {
                    post.likes.splice(likeIndex, 1);
                } else {
                    post.likes.push({ userId });
                }
            }
        }
    },
    setComment: (state, action) => {
        const { postId, comment } = action.payload;
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
            state.posts[postIndex].comments.push(comment);
        }
    },
    deleteComment: (state, action) => {
        const { postId, commentId } = action.payload;
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
            const commentIndex = state.posts[postIndex].comments.findIndex(comment => comment._id === commentId);
            if (commentIndex !== -1) {
                state.posts[postIndex].comments.splice(commentIndex, 1);
            }
        }
    },
});

export const {addCommunity,setLoading,setError, setCommunities, setCurrentCommunity, setMembers, setPosts,addMember,removeMember,removeCommunity,setLike,addComment,removeComment,addPost,removePost} = communitySlice.actions;
export default communitySlice.reducer;