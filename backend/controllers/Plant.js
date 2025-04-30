const Plant = require("../models/Plant");
const User = require("../models/User");
const Garden = require("../models/Garden");

//add plant 
const addPlant = async (req, res) => {
    try {
        //fetch data
        const userId  = req.user.id;
        const { plantId, name,image,wateringFrequency,soilChangeFrequency} = req.body;
        //validate
        if (!plantId || !name || !image || !wateringFrequency || !soilChangeFrequency) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //create plant
        const plant = new Plant({
            name,
            image,
            wateringFrequency,
            soilChangeFrequency
        });
        //send response
        res.status(200).json({ message: "Plant added to garden successfully", plant });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete plant
const deletePlant = async (req, res) => {
    try {
        //fetch data
        const { userId } = req.user.id;
        const { plantId } = req.body;
        //validate
        if (!plantId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //get garden
        const user = await User.findById(userId).populate("garden");
        const garden = user.garden;
        //delete plant
        garden.plants = garden.plants.filter(plant => plant._id != plantId);
        await garden.save();
        //delete plant
        await Plant.findByIdAndDelete(plantId);
        //send response
        res.status(200).json({ message: "Plant deleted from garden successfully", garden });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//search plant
const searchPlant = async (req, res) => {
    try {
        //fetch data
        const { name } = req.body;
        //validate
        if (!name) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //search plant
        const plants = await Plant.find({ name: { $regex: name, $options: "i" } });
        //send response
        res.status(200).json({ message: "Plants found successfully", plants });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addPlant, deletePlant, searchPlant };