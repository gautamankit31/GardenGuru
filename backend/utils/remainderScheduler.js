const cron = require('node-cron');
const User = require('../models/User');
const Garden = require('../models/Garden');
const { mailSender } = require('./mailSender');

cron.schedule('0 * * * *', async () => {
  try {
    const users = await User.find().populate('garden');
    const now = new Date();

    for (const user of users) {
      const garden = user.garden;

      if (!garden || !garden.plants || garden.plants.length === 0) continue;

      let gardenModified = false;

      for (const plant of garden.plants) {
        const plantMeta = plant.plant;
        if (!plantMeta || plantMeta.wateringFrequency == null || plantMeta.soilChangeFrequency == null) continue;

        const nextWater = new Date(plant.lastWatered);
        nextWater.setDate(nextWater.getDate() + plantMeta.wateringFrequency);

        const nextSoil = new Date(plant.lastSoilChanged);
        nextSoil.setDate(nextSoil.getDate() + plantMeta.soilChangeFrequency);

        const shouldWater = now >= nextWater;
        const shouldChangeSoil = now >= nextSoil;

        if (shouldWater) {
          await mailSender(
            user.email,
            'Water Reminder - GardenGuru 🌿',
            `Hi ${user.firstName},\n\nIt's time to water your ${plantMeta.name}!`
          );
          plant.lastWatered = now;
          gardenModified = true;
        }

        if (shouldChangeSoil) {
          await mailSender(
            user.email,
            'Soil Change Reminder - GardenGuru 🌱',
            `Hi ${user.firstName},\n\nTime to change the soil for your ${plantMeta.name}!`
          );
          plant.lastSoilChanged = now;
          gardenModified = true;
        }
      }

      if (gardenModified) {
        await garden.save();
      }
    }
  } catch (error) {
    console.error('Error in reminder scheduler:', error);
  }
});
