import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    error: null,
    userPrompts: [],
    botConversations: [],
};

const GeminiSlice = createSlice({
    name: "gemini",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addUserPrompt: (state, action) => {
            state.userPrompts.push(action.payload);
        },
        botConversations: (state, action) => {
            state.botConversations.push(action.payload);
        }
    },
});

export default GeminiSlice.reducer;