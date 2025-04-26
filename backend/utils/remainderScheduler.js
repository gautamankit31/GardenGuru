// reminderScheduler.js
const cron = require('node-cron');
const Plant = require('../models/Plant');
const {mailSender} = require('./mailSender');

cron.schedule('0 * * * *', async () => {
  const plants = await Plant.find();

  const now = new Date();

  plants.forEach(async (plant) => {
    const nextWater = new Date(plant.lastWatered);
    nextWater.setDate(nextWater.getDate() + plant.wateringFrequency);

    const nextSoil = new Date(plant.lastSoilChanged);
    nextSoil.setDate(nextSoil.getDate() + plant.soilChangeFrequency);

    if (now >= nextWater) {
        // send watering reminder
        await mailSender(plant.userEmail, 'Water your plant', `It's time to water your ${plant.name}!`);
        await Plant.findByIdAndUpdate(plant._id, { lastWatered: now });
    }

    if (now >= nextSoil) {
        // send soil change reminder
       await mailSender(plant.userEmail, 'Change your plant soil', `It's time to change the soil for your ${plant.name}!`);
       await Plant.findByIdAndUpdate(plant._id, { lastSoilChanged: now });
    }
  });
});
