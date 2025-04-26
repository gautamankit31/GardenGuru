import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editGardenName ,deletePlant,editPlantNickname,editPlantSoilChangeFrequency,editPlantWateringFrequency} from '../../../slices/GardenSlice';
function Garden() {
    const {plant,loading,name}=useSelector((state) => state.garden);
    const {token}=useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const KEY = import.meta.env.VITE_API_PLANT_KEY;

    const gardenNameChangeHandler=async()=>{
      const newName=prompt("Enter new garden name");
      if(newName){
        dispatch(editGardenName(newName));
      }
    }

    const deletePlantHandler=async(id)=>{
      dispatch(deletePlant(id));
    }

    const editPlantlantNicknameHandler=async(id)=>{
      dispatch(editPlantNickname(id));
    }

    const editPlantWateringFrequencyHandler=async(id)=>{
      const data=await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${id}?key=${KEY}`);
      const plantData=await data.json();
      dispatch(editPlantWateringFrequency(id,data.wateringFrequency));
    }

    const editPlantSoilChangeHandler=async(id)=>{
      const data=await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${id}?key=${KEY}`);
      const plantData=await data.json();
      dispatch(editPlantSoilChangeFrequency(id,data.soilChangeFrequency));
    }

    const getNextWaterDate = (lastWatered, frequency) => {
      const next = new Date(lastWatered);
      next.setDate(next.getDate() + frequency);
      return next.toDateString();
    };
    
  return (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Garden</h1>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>Garden Name: {name}</h1>
          <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={gardenNameChangeHandler}>Edit Garden Name</button>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>Plants</h1>
          {plant.map((item) => (
            <div key={item._id} className='flex flex-col gap-2'>
              <h1 className='text-lg font-bold'>{item.nickname}</h1>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={editPlantlantNicknameHandler}>Edit plant nickName</button>
              <p className='text-sm'>Watering Frequency: {item.wateringFrequency}</p>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={editPlantWateringFrequencyHandler}>Edit plant water frequency</button>
              <p className='text-sm'>Soil Change Frequency: {item.soilChangeFrequency}</p>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={()=>editPlantSoilChangeHandler(item._id)}>Edit plant soil change frequency</button>
              <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={()=>deletePlantHandler(item._id)}>Delete Plant</button>
              <p>Water again on: {getNextWaterDate(plant.lastWatered, plant.wateringFrequency)}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default Garden