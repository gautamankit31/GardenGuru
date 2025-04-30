import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addPlantToTheGarden } from '../../../services/operations/Garden';
import { useDispatch, useSelector } from 'react-redux';

const PlantTemplate = ({ plant }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {plants,name,isLoading}=useSelector((state)=> state.garden);
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
    dispatch(addPlantToTheGarden( plantId, plantName, plantImage,0,0,token ));
  };

  const plantAlreadyAdded= plants.some(
    (p) => p?.plant?.id === plant.id
  );

  return (
    <div
      key={plant.id}
      className="border p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div
        onClick={plantDetailsHandler}
        className="cursor-pointer flex justify-center items-center flex-col"
      >
        <img
          src={plant.default_image?.medium_url}
          alt={plant.name}
          className="w-[300px] h-[300px] object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold text-center mt-4">
          {plant.common_name}
        </h2>
      </div>

      {/* Add to Garden Button */}
      {!isLoading && user && (
        <div className="flex justify-center mt-4">
          {plantAlreadyAdded ? (
            <span className="text-green-600 font-semibold">Already Added</span>
          ) : (
            <button
              className="bg-[#20b486] text-white px-6 py-2 rounded-full hover:bg-[#17996f] transition-colors duration-300"
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
