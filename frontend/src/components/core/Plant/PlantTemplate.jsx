import React from "react";
import { useNavigate } from "react-router-dom";
import { addPlantToTheGarden } from "../../../services/operations/Garden";
import { useDispatch, useSelector } from "react-redux";

const PlantTemplate = ({ plant }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { plants, name, isLoading } = useSelector((state) => state.garden);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plantDetailsHandler = () => {
    const plantId = plant.id;
    navigate(`/plant/${plantId}`);
  };

  const addPlantToGardenHandler = async () => {
    const plantId = plant.id;
    const plantName = plant.common_name;
    const plantImage = plant.default_image?.medium_url;
    dispatch(addPlantToTheGarden(plantId, plantName, plantImage, 0, 0, token));
  };

  const plantAlreadyAdded = plants.some((p) => p?.plant?.id === plant.id);

  return (
    <div
      key={plant.id}
      className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300 w-72 flex-shrink-0 bg-white"
    >
      <div
        onClick={plantDetailsHandler}
        className="cursor-pointer flex flex-col items-center"
      >
        <img
          src={plant.default_image?.medium_url}
          alt={plant.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-lg font-semibold text-center mt-3">
          {plant.common_name}
        </h2>
      </div>

      {!isLoading && user && (
        <div className="flex justify-center mt-4">
          {plantAlreadyAdded ? (
            <span className="text-green-600 font-semibold">Already Added</span>
          ) : (
            <button
              className="bg-[#20b486] text-white px-4 py-2 rounded-full hover:bg-[#17996f] transition duration-300"
              onClick={addPlantToGardenHandler}
            >
              Add to Garden
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantTemplate;
