const express = require("express");
const router = express.Router();

const { auth, isAdmin, isUser } = require("../middlewares/auth");

const {
  editGardenName,
  editPlantNickname,
  editPlantWateringFrequency,
  editPlantSoilChangeFrequency,
  addPlantToGarden,
  getGardenPlants,
} = require("../controllers/Garden");

const { 
    addPlant,
    deletePlant,
    searchPlant
} = require("../controllers/Plant");

router.put("/editGardenName", auth, editGardenName);
router.put("/editPlantNickname", auth, editPlantNickname);
router.put("/editPlantWateringFrequency", auth, editPlantWateringFrequency);
router.put("/editPlantSoilChangeFrequency", auth, editPlantSoilChangeFrequency);
router.put("/addPlantToGarden", auth, addPlantToGarden);

router.get("/getGardenPlants", auth, getGardenPlants);

router.post("/addPlant", auth, addPlant);
router.delete("/deletePlant", auth, deletePlant);
router.get("/searchPlant", auth, searchPlant);

module.exports = router;
