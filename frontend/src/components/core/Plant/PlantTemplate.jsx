import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addPlantToGarden } from '../../../slices/GardenSlice';
import { useDispatch, useSelector } from 'react-redux';

const PlantTemplate = ({ plant }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plantDetailsHandler = () => {
    const plantId = plant.id;
    navigate(`/plant/${plantId}`);
  };

  const addPlantToGardenHandler = async () => {
    const plantxdata = await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${plant.id}?key=${KEY}`);
    const plantData = await plantxdata.json();
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
  };

  return (
    <div key={plant.id} className="border p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {/* Whole card clickable (image + name) */}
      <div onClick={plantDetailsHandler} className="cursor-pointer flex justify-center items-center flex-col">
        <img
          src={plant.default_image?.medium_url}
          alt={plant.name}
          className="w-[300px] h-[300px] object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold text-center mt-4">{plant.common_name}</h2>
      </div>

      {/* Add to Garden Button */}
      {user && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#20b486] text-white px-6 py-2 rounded-full hover:bg-[#17996f] transition-colors duration-300"
            onClick={addPlantToGardenHandler}
          >
            Add to Garden
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantTemplate;
