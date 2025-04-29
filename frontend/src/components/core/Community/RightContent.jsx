import React from "react";
import PostCard from "./PostCard";

const RightContent = ({
  currentCommunity,
  posts,
  handleLike,
  showCommentBox,
  setShowCommentBox,
  commentText,
  setCommentText,
  handleAddComment,
  user,
  dispatch,
  removeTheComment,
  token,
}) => {
  return (
    <>
      <h1>{currentCommunity.name}</h1>
      <p>{currentCommunity.description}</p>

      <h3 style={{ marginTop: "20px" }}>Posts:</h3>
      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          post={post}
          handleLike={handleLike}
          showCommentBox={showCommentBox}
          setShowCommentBox={setShowCommentBox}
          commentText={commentText}
          setCommentText={setCommentText}
          handleAddComment={handleAddComment}
          user={user}
          dispatch={dispatch}
          removeTheComment={removeTheComment}
          token={token}
          currentCommunity={currentCommunity}
        />
      ))}
    </>
  );
};

export default RightContent;