import React, { useEffect, useState } from "react";
import { getAllCommunities } from "../services/operations/Community";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommunity,
  deleteCommunity,
} from "../services/operations/Community";
import { setCurrentCommunity } from "../slices/CommunitySlice";

function Community() {
  const dispatch = useDispatch();
  const { communities, loading, currentCommunity } = useSelector(
    (state) => state.community
  );
  const { token, user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  useEffect(() => {
    dispatch(getAllCommunities(token));
  }, [dispatch, token]);
  console.log(currentCommunity?._id);
  useEffect(() => {
    if (communities && communities.length > 0 && !currentCommunity) {
      dispatch(setCurrentCommunity(communities[0]));
    }
  }, [communities, currentCommunity, dispatch]);

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

  const handleJoinLeave = () => {
    // TODO: Dispatch join/leave action based on if user is a member
    alert("Join/Leave functionality to be implemented.");
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

  if (loading) return <p>Loading...</p>;
  if (!communities || communities.length === 0) return <p>No data found</p>;

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
            {currentCommunity.posts.map((post, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4>{post.title}</h4>
                <p>{post.desc}</p>
                {post.image && (
                  <img
                    src={post.image}
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
