import React from "react";

const LeftSidebar = ({
  communities,
  filteredCommunities,
  searchTerm,
  setSearchTerm,
  handleSearch,
  setShowCreateForm,
  dispatch,
  setCurrentCommunity,
  getPosts,
  getMembers,
  token,
  currentCommunity,
}) => {
  return (
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

      <h3>My Communities:</h3>
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

      <h3>All Communities:</h3>
      {(filteredCommunities.length > 0 ? filteredCommunities : communities).map(
        (community) => (
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
        )
      )}
    </div>
  );
};

export default LeftSidebar;