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
    const { plantId, image,name, wateringFrequency, soilChangeFrequency } = req.body;
    const userId=req.user.id;

    if (!plantId || !image ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findById(userId).populate("garden");
    const garden = user.garden;
    let checkPlantExist=await Plant.findOne({ id: plantId });
    if (!checkPlantExist) {
      checkPlantExist = await Plant.create({
        id:plantId,
        name,
        image,
        wateringFrequency,
        soilChangeFrequency,
      });
    }
    

    const existingPlant = garden.plants.find((plant) => plant.plant.toString() === checkPlantExist._id.toString());
    if (existingPlant) {
      return res.status(400).json({ message: "Plant already exists in the garden" });
    }
    garden.plants.push({
      plant: checkPlantExist._id,
      nickname: req.body?.nickname || name,
    });

    await garden.save();

    const lastAddedPlant = await garden.populate({
      path: "plants.plant",
      select: "_id id common_name default_image lastWatered lastSoilChanged wateringFrequency soilChangeFrequency",
    });

    const addedPlant = lastAddedPlant.plants[lastAddedPlant.plants.length - 1];

    return res.status(200).json({
      success: true,
      message: "Plant added to garden",
      addedPlant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add plant and reminder to garden",
    });
  }
};

const deletePlantFromGarden = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.user.id;

    if (!plantId) {
      return res.status(400).json({ message: "Please provide a plant ID" });
    }

    const user = await User.findById(userId).populate("garden");
    const garden = user.garden;

    const plantIndex = garden.plants.findIndex((plant) => plant.plant.toString() === plantId);

    if (plantIndex === -1) {
      return res.status(404).json({ message: "Plant not found in the garden" });
    }

    garden.plants.splice(plantIndex, 1);
    await garden.save();

    res.status(200).json({
      success: true,
      message: "Plant removed from garden successfully",
      garden,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getGardenPlants = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "garden",
      populate: {
        path: "plants.plant",
      },
    });

    if (!user || !user.garden) {
      return res.status(404).json({
        success: false,
        message: "User or garden not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Garden plants retrieved successfully",
      garden:user.garden,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    editGardenName,
    editPlantNickname,
    editPlantWateringFrequency,
    editPlantSoilChangeFrequency,
    addPlantToGarden,
    getGardenPlants,
    deletePlantFromGarden,
    };