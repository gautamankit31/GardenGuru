import React from "react";

const CommentSection = ({
  post,
  showCommentBox,
  commentText,
  setCommentText,
  handleAddComment,
  dispatch,
  removeTheComment,
  token,
  currentCommunity,
  user,
}) => {
  return (
    <>
      {showCommentBox[post._id] && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={commentText[post._id] || ""}
            onChange={(e) =>
              setCommentText({
                ...commentText,
                [post._id]: e.target.value,
              })
            }
            placeholder="Write a comment..."
            style={{ width: "80%", padding: "5px" }}
          />
          <button
            style={{ marginLeft: "5px" }}
            onClick={() => handleAddComment(post._id)}
          >
            Post
          </button>
        </div>
      )}

      {post.comments && post.comments.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>Comments:</h4>
          {post.comments.map((comment, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              {comment.content}
              {(currentCommunity.creator === user?._id ||
                comment.author === user?._id) && (
                <button
                  onClick={() =>
                    dispatch(removeTheComment(post._id, comment._id, token))
                  }
                >
                  Delete Comment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentSection;