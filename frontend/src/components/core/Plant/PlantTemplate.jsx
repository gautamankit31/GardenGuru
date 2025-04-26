import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addPlantToGarden } from '../../../slices/GardenSlice';
import { useDispatch } from 'react-redux';

const PlantTemplate = ({plant}) => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const plantDetailsHandler = () => {
    const plantId =plant.id;
    console.log(plantId);
    navigate(`/plant/${plantId}`);
  }

  const addPlantToGardenHandler =async () => {
    const plantxdata=await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${plant.id}?key=${KEY}`);
    const plantData=await plantxdata.json();
    const plantId = plant.id;
    const name = plant.common_name;
    const image = plant.default_image?.medium_url;
    const wateringFrequency = plantData.water; // default value
    const soilChangeFrequency = plantData.soil; // default value
    dispatch(
      addPlantToGarden(
        plantId,
        name,
        image,
        wateringFrequency,
        soilChangeFrequency
      )
    );
  }
  return (
    <>
      <div key={plant.id} className="border p-4 rounded-md shadow-md mb-4">
        <h2 className="text-lg font-bold" onClick={plantDetailsHandler}>
          {plant.common_name}
        </h2>
        <img
          src={plant.default_image?.medium_url}
          alt={plant.name}
          className="w-full h-auto mt-2"
        />
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addPlantToGardenHandler}>addPlantToGarden
          </button>
      </div>
    </>
  );
}

export default PlantTemplate