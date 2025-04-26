import toast from 'react-hot-toast';
import {deletePlant, addPlantToGarden, editGardenName,setLoading,editPlantNickname,editPlantSoilChangeFrequency,editPlantWateringFrequency } from '../../slices/GardenSlice';
import { apiConnector } from '../apiConnector';

export const addPlantToGarden = (
  plantId,
  name,
  image,
  wateringFrequency,
  soilChangeFrequency
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", endpoints.ADD_PLANT_TO_GARDEN_API, {
            plantId,
            name,
            image,
            wateringFrequency,
            soilChangeFrequency,
        });
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

export const editGardenName = (name) => {
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

export const editPlantNickname = (plantId, nickname) => {
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

export const editPlantWateringFrequency = (plantId, frequency) => {
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

export const editPlantSoilChangeFrequency = (plantId, frequency) => {
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

export const deletePlant = (plantId) => {
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