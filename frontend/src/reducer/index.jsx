import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice  from "../slices/ProfileSlice";
import gardenSlice from "../slices/GardenSlice";
import contactSlice from "../slices/ContactSlice";
import communitySlice from "../slices/CommunitySlice";
import geminiSlice from "../slices/GeminiSlice";

const rootReducer = combineReducers({
  auth:authSlice,
  profile:profileSlice,
  garden:gardenSlice,
  contact:contactSlice,
  community:communitySlice,
  gemini:geminiSlice,
});

export default rootReducer;