const User = require("../models/User");
const Garden = require("../models/Garden");
const Plant = require("../models/Plant");

//edit garden name
const editGardenName=async(req,res)=>{
    try{
        //fetcch data
        const {userid}=req.user.id;
        const {name}=req.body;
        //validate
        if(!name){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //get garden
        const user=await User.findById(userid).populate("garden");
        const garden=user.garden;
        //update garden name
        garden.name=name;
        await garden.save();
        //send response
        res.status(200).json({message:"Garden name updated successfully",garden});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//edit plant nickname
const editPlantNickname=async(req,res)=>{
    try{
        //fetch data
        const {userid}=req.user.id;
        const {plantId,nickname}=req.body;
        //validate
        if(!plantId || !nickname){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //get garden
        const user=await User.findById(userid).populate("garden");
        const garden=user.garden;
        //get plant
        const plant=garden.plants.id(plantId);
        //update plant nickname
        plant.nickname=nickname;
        await garden.save();
        //send response
        res.status(200).json({message:"Plant nickname updated successfully",garden});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//edit plant watering frequency
const editPlantWateringFrequency=async(req,res)=>{
    try{
        //fetch data
        const {userid}=req.user.id;
        const {plantId,frequency}=req.body;
        //validate
        if(!plantId || !frequency){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //get garden
        const user=await User.findById(userid).populate("garden");
        const garden=user.garden;
        //get plant
        const plant=garden.plants.id(plantId);
        //update plant watering frequency
        plant.wateringFrequency=frequency;
        await garden.save();
        //send response
        res.status(200).json({message:"Plant watering frequency updated successfully",garden});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//edit plant soil change frequency
const editPlantSoilChangeFrequency=async(req,res)=>{
    try{
        //fetch data
        const {userid}=req.user.id;
        const {plantId,frequency}=req.body;
        //validate
        if(!plantId || !frequency){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //get garden
        const user=await User.findById(userid).populate("garden");
        const garden=user.garden;
        //get plant
        const plant=garden.plants.id(plantId);
        //update plant soil change frequency
        plant.soilChangeFrequency=frequency;
        await garden.save();
        //send response
        res.status(200).json({message:"Plant soil change frequency updated successfully",garden});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//add plant to garden
const addPlantToGarden = async (req, res) => {
  try {
    const { gardenId, plantId, nickname, reminderType, lastAction, nextAction } = req.body;

    // Find the garden by ID
    const garden = await Garden.findById(gardenId);
    if (!garden) {
      return res.status(404).json({
        success: false,
        message: "Garden not found",
      });
    }

    // Add plant to the garden
    garden.plants.push({
      plant: plantId,
      nickname: nickname,
      addedAt: new Date(),
    });

    // Add reminder to the garden
    garden.reminders.push({
      type: reminderType,
      plant: plantId,
      lastAction: lastAction,
      nextAction: nextAction,
    });

    // Save the updated garden
    await garden.save();

    res.status(200).json({
      success: true,
      message: "Plant and reminder added to garden successfully",
      garden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add plant and reminder to garden",
    });
  }
};

module.exports = {
    editGardenName,
    editPlantNickname,
    editPlantWateringFrequency,
    editPlantSoilChangeFrequency,
    addPlantToGarden,
    };