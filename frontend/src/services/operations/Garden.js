import toast from 'react-hot-toast';
import {setGardenPlants,deletePlant, addPlantToGarden, editGardenName,setLoading,editPlantNickname,editPlantSoilChangeFrequency,editPlantWateringFrequency } from '../../slices/GardenSlice';
import { apiConnector } from '../apiConnector';
import { gardenEndpoints } from '../api';

export const getGardenPlants=()=>{
  return async (dispatch) => {

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", gardenEndpoints.GET_GARDEN_PLANTS_API);
      console.log("GET GARDEN PLANTS API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Garden plants retrieved successfully");
      // dispatch(setGardenPlants(response.data.plants));
    } catch (error) {
      console.log("GET GARDEN PLANTS API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export const addPlantToTheGarden = (
  plantId,
  name,
  image,
  wateringFrequency,
  soilChangeFrequency,
  token
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("PUT", gardenEndpoints.ADD_PLANT_TO_GARDEN_API, {
            plantId,
            name,
            image,
            wateringFrequency,
            soilChangeFrequency,
        },
      {Authorization: `Bearer ${token}`},
      );
        console.log("ADD PLANT TO GARDEN API RESPONSE............", response.data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Plant added to garden successfully");
        dispatch(addPlantToGarden(response.data.plant));
    } catch (error) {
      console.log("ADD PLANT TO GARDEN API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const editTheGardenName = (name) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", endpoints.EDIT_GARDEN_NAME_API, {
        name,
      });
      console.log("EDIT GARDEN NAME API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Garden name updated successfully");
      dispatch(editGardenName(name));
    } catch (error) {
      console.log("EDIT GARDEN NAME API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const editThePlantNickname = (plantId, nickname) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", endpoints.EDIT_PLANT_NICKNAME_API, {
        plantId,
        nickname,
      });
      console.log("EDIT PLANT NICKNAME API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Plant nickname updated successfully");
      dispatch(editPlantNickname({ plantId, nickname }));
    } catch (error) {
      console.log("EDIT PLANT NICKNAME API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const editThePlantWateringFrequency = (plantId, frequency) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", endpoints.EDIT_PLANT_WATERING_FREQUENCY_API, {
        plantId,
        frequency,
      });
      console.log("EDIT PLANT WATERING FREQUENCY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Plant watering frequency updated successfully");
      dispatch(editPlantWateringFrequency({ plantId, frequency }));
    } catch (error) {
      console.log("EDIT PLANT WATERING FREQUENCY API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const editThePlantSoilChangeFrequency = (plantId, frequency) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", endpoints.EDIT_PLANT_SOIL_CHANGE_FREQUENCY_API, {
        plantId,
        frequency,
      });
      console.log("EDIT PLANT SOIL CHANGE FREQUENCY API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Plant soil change frequency updated successfully");
      dispatch(editPlantSoilChangeFrequency({ plantId, frequency }));
    } catch (error) {
      console.log("EDIT PLANT SOIL CHANGE FREQUENCY API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const deleteThePlant = (plantId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", endpoints.DELETE_PLANT_API, {
        plantId,
      });
      console.log("DELETE PLANT API RESPONSE............", response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Plant deleted successfully");
      dispatch(deletePlant(plantId));
    } catch (error) {
      console.log("DELETE PLANT API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}