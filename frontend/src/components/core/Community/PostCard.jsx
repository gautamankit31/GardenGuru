import React from "react";
import CommentSection from "./CommentSection";

const PostCard = ({
  post,
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
  currentCommunity,
}) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>{post.content}</p>
      {post.media && (
        <img
          src={post.media}
          alt={post.title}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleLike(post._id)}>
          {post.likes?.some((like) => like.userId === user._id)
            ? "Unlike"
            : "Like"}{" "}
          ({post.likes?.length || 0})
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() =>
            setShowCommentBox((prev) => ({
              ...prev,
              [post._id]: !prev[post._id],
            }))
          }
        >
          Comment
        </button>

        <CommentSection
          post={post}
          showCommentBox={showCommentBox}
          commentText={commentText}
          setCommentText={setCommentText}
          handleAddComment={handleAddComment}
          dispatch={dispatch}
          removeTheComment={removeTheComment}
          token={token}
          currentCommunity={currentCommunity}
          user={user}
        />
      </div>
    </div>
  );
};

export default PostCard;