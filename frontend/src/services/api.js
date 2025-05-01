const BASE_URL=import.meta.env.VITE_API_URL;
const KEY=import.meta.env.VITE_API_PLANT_KEY;

export const endpoints = {
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  };

export const profileEndpoints = {
    //udpte profile
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    //delete account
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteProfile",
    //updatedisplay picture
    UPDATE_DISPLAY_PIC_API: BASE_URL + "/profile/updateDisplayPicture",
  };

export const postEndpoints = {
    //create post
    CREATE_POST_API: BASE_URL + "/post/createPost",
    //delete post
    DELETE_POST_API: BASE_URL + "/post/deletePost",
    //like post
    LIKE_POST_API: BASE_URL + "/post/likePost",
    //unlike post
    UNLIKE_POST_API: BASE_URL + "/post/unlikePost",
    //add comment
    ADD_COMMENT_API: BASE_URL + "/post/addComment",
    //delete comment
    DELETE_COMMENT_API: BASE_URL + "/post/deleteComment",
    //like comment
    LIKE_COMMENT_API: BASE_URL + "/post/likeComment",
  };

export const geminiEndpoints = {
    //talk to gemini
    TALK_TO_GEMINI_API: BASE_URL + "/gemini/talktogemini",
  };

export const gardenEndpoints = {
  //get garden plants

  GET_GARDEN_PLANTS_API: BASE_URL + "/garden/getGardenPlants",
    //edit garden name
    EDIT_GARDEN_NAME_API: BASE_URL + "/garden/editGardenName",
    //edit plant nickname
    EDIT_PLANT_NICKNAME_API: BASE_URL + "/garden/editPlantNickname",
    //edit plant watering frequency
    EDIT_PLANT_WATERING_FREQUENCY_API: BASE_URL + "/garden/editPlantWateringFrequency",
    //edit plant soil change frequency
    EDIT_PLANT_SOIL_CHANGE_FREQUENCY_API: BASE_URL + "/garden/editPlantSoilChangeFrequency",
    //add plant to garden
    ADD_PLANT_TO_GARDEN_API: BASE_URL + "/garden/addPlantToGarden",

    //delete plant from garden
    DELETE_PLANT_FROM_GARDEN_API: BASE_URL + "/garden/deletePlantFromGarden",

    //add plant
    ADD_PLANT_API: BASE_URL + "/garden/addPlant",
    //delete plant
    DELETE_PLANT_API: BASE_URL + "/garden/deletePlant",
    //search plant
    SEARCH_PLANT_API: BASE_URL + "/garden/searchPlant",
};

export const communityEndpoints = {
    //create community
    CREATE_COMMUNITY_API: BASE_URL + "/community/createCommunity",
    //join community
    JOIN_COMMUNITY_API: BASE_URL + "/community/joinCommunity",
    //leave community
    LEAVE_COMMUNITY_API: BASE_URL + "/community/leaveCommunity",
    //delete community
    DELETE_COMMUNITY_API: BASE_URL + "/community/deleteCommunity",
    //update community
    UPDATE_COMMUNITY_API: BASE_URL + "/community/updateCommunity",
    //get community
    GET_COMMUNITY_API: BASE_URL + "/community/getCommunity",
    //get all communities
    GET_ALL_COMMUNITIES_API: BASE_URL + "/community/getAllCommunities",
    //get members
    GET_MEMBERS_API: BASE_URL + "/community/getMembers",
    //get posts
    GET_POSTS_API: BASE_URL + "/community/getPosts",
};

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
//indoor outdoor plant
export const plantEndpoints = {
  GET_ALL_PLANTS: `https://perenual.com/api/v2/species-list?key=${KEY}`,
  GET_PLANT_BY_ID: `https://perenual.com/api/v2/species/details`,
  GET_PLANT_CARE_GUIDE: `https://perenual.com/api/species-care-guide-list?key=${KEY}`,
  
};
