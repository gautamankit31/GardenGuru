import React, { useEffect, useState } from "react";
import { getAllCommunities, joinCommunity, leaveCommunity, getMembers, getPosts} from "../services/operations/Community";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommunity,
  deleteCommunity,
  addThePost,
} from "../services/operations/Community";
import { setCurrentCommunity } from "../slices/CommunitySlice";

function Community() {
  const dispatch = useDispatch();
  const { communities, loading, currentCommunity ,posts} = useSelector(
    (state) => state.community
  );
  const { token} = useSelector((state) => state.auth);
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
  }, []);

  useEffect(() => {
    if (currentCommunity && token) {
      dispatch(getPosts(currentCommunity._id, token)); // Fetch posts for the current community
      dispatch(getMembers(currentCommunity._id, token));
    }
  }, [dispatch, currentCommunity, token]);
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
// console.log(user._id)

  const handleJoinLeave = () => {
    if ((currentCommunity.members || []).includes(user?._id)) {
      dispatch(leaveCommunity(currentCommunity._id,token,user));
    } else {
      dispatch(joinCommunity(currentCommunity._id,token,user));
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
        addThePost(currentCommunity._id, postDescription, postImage,token)
      );
      setPostDescription("");
      setPostImage(null);
      setShowAddPostForm(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (!communities || communities.length === 0) return <p>No data found</p>;

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* LEFT SIDE */}
      <div
        style={{
          flex: "1",
          paddingRight: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <button
          style={{ marginBottom: "10px" }}
          onClick={() => setShowCreateForm(true)}
        >
          Create Community
        </button>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Search Community..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "5px" }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <h3>All Communities:</h3>
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
            style={{
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight:
                currentCommunity?._id === community._id ? "bold" : "normal",
            }}
          >
            {community.name}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: "2", paddingLeft: "20px" }}>
        {showCreateForm ? (
          <>
            <h1>Create a New Community</h1>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Community Name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <textarea
                placeholder="Community Description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                style={{ width: "100%", padding: "8px", height: "100px" }}
              ></textarea>
            </div>
            <button onClick={handleCreateCommunity}>Create</button>
          </>
        ) : currentCommunity ? (
          <>
            <h1>{currentCommunity.name}</h1>
            <p>{currentCommunity.description}</p>

            {(currentCommunity.creator === user?._id ||
              (currentCommunity.members || []).includes(user?._id)) && (
              <button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onClick={() => setShowAddPostForm(true)}
              >
                Add Post
              </button>
            )}

            {showAddPostForm && (
              <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                <h3>Create a Post</h3>
                <textarea
                  placeholder="What's on your mind?"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                    height: "80px",
                  }}
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                  style={{ marginBottom: "10px" }}
                />
                <br />
                <button onClick={handleAddPost}>Post</button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setShowAddPostForm(false);
                    setPostDescription("");
                    setPostImage(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

            {currentCommunity.creator === user?._id ? (
              <button onClick={handleDeleteCommunity}>Delete Community</button>
            ) : (
              <button onClick={handleJoinLeave}>
                {(currentCommunity.members || []).includes(user?._id)
                  ? "Leave Community"
                  : "Join Community"}
              </button>
            )}

            <h3 style={{ marginTop: "20px" }}>Posts:</h3>
            {posts.map((post, idx) => (
              <div
                key={idx}
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
                  <button>Like</button>
                  <button style={{ marginLeft: "10px" }}>Comments</button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Select a community</p>
        )}
      </div>
    </div>
  );
}

export default Community;
