import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  plant: [],
  loading: false,
};

const gardenSlice = createSlice({
  name: "garden",
  initialState,
  reducers: {
    editGardenName: (state, action) => {
      state.name = action.payload;
    },
    addPlantToGarden: (state, action) => {
      state.plant.push(action.payload);
    },
    editPlantNickname: (state, action) => {
      const { id, nickname } = action.payload;
      const plant = state.plant.find(p => p.id === id);
      if (plant) plant.nickname = nickname;
    },
    editPlantWateringFrequency: (state, action) => {
      const { id, wateringFrequency } = action.payload;
      const plant = state.plant.find(p => p.id === id);
      if (plant) plant.wateringFrequency = wateringFrequency;
    },
    editPlantSoilChangeFrequency: (state, action) => {
      const { id, soilChangeFrequency } = action.payload;
      const plant = state.plant.find(p => p.id === id);
      if (plant) plant.soilChangeFrequency = soilChangeFrequency;
    },
    deletePlant: (state, action) => {
      const id = action.payload;
      state.plant = state.plant.filter(p => p.id !== id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  editGardenName,
  addPlantToGarden,
  editPlantNickname,
  editPlantWateringFrequency,
  editPlantSoilChangeFrequency,
  deletePlant,
  setLoading,
} = gardenSlice.actions;

export default gardenSlice.reducer;
