import React, { useEffect, useState } from "react";
import {
  getAllCommunities,
  joinCommunity,
  leaveCommunity,
  getMembers,
  getPosts,
  deletePost,
} from "../services/operations/Community";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommunity,
  deleteCommunity,
  addThePost,
} from "../services/operations/Community";
import { setCurrentCommunity } from "../slices/CommunitySlice";
import {
  addLike,
  addTheComment,
  removeLike,
  removeTheComment,
} from "../services/operations/Post";

function Community() {
  const dispatch = useDispatch();
  const { communities, loading, currentCommunity, posts } = useSelector(
    (state) => state.community
  );
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    dispatch(getAllCommunities(token));
  }, [token]);

  useEffect(() => {
    if (currentCommunity && token) {
      dispatch(getPosts(currentCommunity._id, token)); // Fetch posts for the current community
      dispatch(getMembers(currentCommunity._id, token));
    }
  }, [currentCommunity]);
  // console.log(currentCommunity?._id);
  // useEffect(() => {
  //   if (communities && communities.length > 0 && !currentCommunity) {
  //     dispatch(setCurrentCommunity(communities[0]));
  //     dispatch(getPosts(communities[0]._id, token));
  //     dispatch(getMembers(communities[0]._id, token));
  //   }
  // }, [communities, currentCommunity, dispatch]);
  const handleDeleteCommunity = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (!confirmed) return;
    if (currentCommunity) {
      dispatch(
        deleteCommunity(currentCommunity?._id, currentCommunity.creator, token)
      );
    }
  };
  // console.log(currentCommunity?.creator)
  // console.log(user._id);
  // console.log(communities);
  // console.log(currentCommunity.members);
  console.log(currentCommunity);

  const handleJoinLeave = () => {
    if ((currentCommunity.members || []).includes(user?._id)) {
      dispatch(leaveCommunity(currentCommunity._id, token, user));
    } else {
      dispatch(joinCommunity(currentCommunity._id, token, user));
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredCommunities([]);
    } else {
      const filtered = communities.filter((community) =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCommunities(filtered);
    }
  };

  const handleCreateCommunity = async () => {
    if (!communityName.trim()) {
      alert("Community name is required");
      return;
    }
    try {
      dispatch(createCommunity(communityName, communityDescription, token));
      setCommunityName("");
      setCommunityDescription("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  const handleAddPost = async () => {
    if (!postDescription.trim()) {
      alert("Post description is required");
      return;
    }
    try {
      dispatch(
        addThePost(currentCommunity._id, postDescription, postImage, token)
      );
      setPostDescription("");
      setPostImage(null);
      setShowAddPostForm(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleLike = (postId) => {
    const post = posts.find((post) => post._id === postId);
    if (post.likes?.some((like) => like === user._id)) {
      console.log("remove call");
      dispatch(removeLike(postId, token, user));
    } else {
      console.log("add like");
      dispatch(addLike(postId, token, user));
    }
  };

  const [showCommentBox, setShowCommentBox] = useState({});
  const [commentText, setCommentText] = useState({});

  const handleAddComment = async (postId) => {
    if (!commentText[postId]?.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    try {
      dispatch(addTheComment(postId, commentText[postId], token));
      setCommentText((prev) => ({ ...prev, [postId]: "" })); // Clear after posting
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (!communities || communities.length === 0) return <p>No data found</p>;

  return (
    <div className="flex p-5">
      {/* LEFT SIDE */}
      <div className="w-full sm:max-w-sm sm:flex-1 sm:pr-5 border-gray-300 bg-white p-4 rounded-md shadow-sm sm:border-r border-none">
        {/* Create Community Button */}
        <button
          className="w-full mb-4 px-4 py-2 bg-[#20b486] text-white rounded-md font-semibold hover:bg-[#1e9b76] transition"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Community
        </button>

        {/* Search Section */}
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search Community..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b486] flex-1"
          />
          <button
            className="px-4 py-2 bg-[#20b486] text-white rounded-md hover:bg-[#87dfa7] transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* My Communities Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">
            My Communities
          </h3>
          <div className="space-y-2">
            {communities
              .filter((community) => community.creator?.includes(user?._id))
              .map((community) => (
                <div
                  key={community._id}
                  onClick={() => {
                    dispatch(setCurrentCommunity(community));
                    dispatch(getPosts(community._id, token));
                    dispatch(getMembers(community._id, token));
                    setShowCreateForm(false);
                  }}
                  className={`px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                    currentCommunity?._id === community._id
                      ? "bg-[#e0f7f3] font-semibold"
                      : ""
                  }`}
                >
                  {community.name}
                </div>
              ))}
          </div>
        </div>

        {/* All Communities Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">
            All Communities
          </h3>
          <div className="space-y-2">
            {(filteredCommunities.length > 0
              ? filteredCommunities
              : communities
            ).map((community) => (
              <div
                key={community._id}
                onClick={() => {
                  dispatch(setCurrentCommunity(community));
                  dispatch(getPosts(community._id, token));
                  dispatch(getMembers(community._id, token));
                  setShowCreateForm(false);
                }}
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                  currentCommunity?._id === community._id
                    ? "bg-[#e0f7f3] font-semibold"
                    : ""
                }`}
              >
                {community.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 pl-5 w-full max-w-4xl mx-auto">
        {showCreateForm ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Create a New Community</h1>
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Community Name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#20b486]"
              />
              <textarea
                placeholder="Community Description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                className="w-full p-3 h-28 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[#20b486]"
              ></textarea>
              <button
                className="px-5 py-2 bg-[#20b486] text-white rounded-md hover:bg-[#1e9b76] transition"
                onClick={handleCreateCommunity}
              >
                Create Community
              </button>
            </div>
          </>
        ) : currentCommunity ? (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold">{currentCommunity.name}</h1>
              <p className="text-lg text-gray-600">
                {currentCommunity.description}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Members: {currentCommunity.members?.length || 0}
              </p>
            </div>

            {(currentCommunity.creator === user?._id ||
              currentCommunity.members?.includes(user?._id)) && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setShowAddPostForm(true)}
                >
                  Add Post
                </button>
              </div>
            )}

            {showAddPostForm && (
              <div className="border p-4 rounded-md shadow-sm bg-white">
                <h3 className="text-lg font-semibold mb-2">Create a Post</h3>
                <textarea
                  placeholder="What's on your mind?"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  className="w-full p-3 h-24 border border-gray-300 rounded resize-none"
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                  className="my-2"
                />
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleAddPost}
                  >
                    Post
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => {
                      setShowAddPostForm(false);
                      setPostDescription("");
                      setPostImage(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              {currentCommunity.creator === user?._id ? (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleDeleteCommunity}
                >
                  Delete Community
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  onClick={handleJoinLeave}
                >
                  {(currentCommunity.members || []).includes(user?._id)
                    ? "Leave Community"
                    : "Join Community"}
                </button>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Posts:</h3>
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-md shadow-sm bg-white space-y-2"
                >
                  <p className="text-lg font-medium">{post.content}</p>
                  {post.media && (
                    <img
                      src={post.media}
                      alt="Post"
                      className="w-full object-cover rounded"
                    />
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
                      onClick={() => handleLike(post._id)}
                    >
                      {post.likes?.some((like) => like.userId === user._id)
                        ? "Unlike"
                        : "Like"}{" "}
                      ({post.likes?.length || 0})
                    </button>

                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      onClick={() =>
                        setShowCommentBox((prev) => ({
                          ...prev,
                          [post._id]: !prev[post._id],
                        }))
                      }
                    >
                      Comment
                    </button>

                    {(currentCommunity.creator === user?._id ||
                      post.author === user?._id) && (
                      <button
                        className="px-3 py-1 text-red-600 hover:underline"
                        onClick={() => dispatch(deletePost(post._id, token))}
                      >
                        Delete Post
                      </button>
                    )}
                  </div>

                  {showCommentBox[post._id] && (
                    <div className="mt-2 space-y-2">
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
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <button
                        className="px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                        onClick={() => handleAddComment(post._id)}
                      >
                        Post Comment
                      </button>
                      {post.comments?.length > 0 && (
                        <div>
                          <h4 className="font-medium">Comments:</h4>
                          {post.comments.map((comment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{comment.content}</span>
                              <button
                                className="text-red-500 hover:underline"
                                onClick={() =>
                                  dispatch(
                                    removeTheComment(
                                      post._id,
                                      comment._id,
                                      token
                                    )
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            Select a community to view posts
          </p>
        )}
      </div>
    </div>
  );
}

export default Community;
