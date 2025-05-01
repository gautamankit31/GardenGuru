import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plantEndpoints } from "../services/api";
import {
  getGardenPlants,
  deleteThePlant
} from "../services/operations/Garden";
import { useNavigate } from "react-router-dom";
import PlantTemplate from "../components/core/Plant/PlantTemplate";

function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_WEATHER_KEY;
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { plants, name, isLoading } = useSelector((state) => state.garden);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hardinessZone, setHardinessZone] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.pincode) {
      fetchHardinessZone(user.pincode);
    }
  }, [user?.pincode]);

  useEffect(() => {
    if (!user) return;
    dispatch(getGardenPlants(token));
  }, [user, dispatch, token]);

  const plantDetailsHandler = (plant) => {
    if (!plant?.id) return;
    navigate(`/plant/${plant.id}`);
  };

  const fetchHardinessZone = async (pincode) => {
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${pincode}&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      if (geoData?.coord?.lat) {
        const { lat } = geoData.coord;
        const zone = getHardinessZone(lat);
        setHardinessZone(zone);
        setError("");
      } else throw new Error("Invalid coordinates");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hardiness zone. Please try again.");
    }
  };

  const getHardinessZone = (lat) => {
    if (lat >= 32 && lat <= 37) return 7;
    if (lat >= 28 && lat < 32) return 8;
    if (lat >= 22 && lat < 28) return 9;
    if (lat < 22) return 10;
    return "Unknown";
  };

  const fetchData = async (zone) => {
    if (!zone || zone === "Unknown") return;
    setLoading(true);
    try {
      const searchLink = `${plantEndpoints.GET_ALL_PLANTS}&hardiness=${zone}`;
      const response = await fetch(searchLink);
      const result = await response.json();
      setData(result?.data || []);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlant = (plantId) => {
    dispatch(deleteThePlant(plantId, token));
  };

  useEffect(() => {
    if (hardinessZone) fetchData(hardinessZone);
  }, [hardinessZone]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex gap-6">
      {/* Left Profile Section */}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <img
          src={user.image}
          alt="User Avatar"
          className="rounded-full h-[100px] w-[100px] mb-4 object-cover"
        />
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="bg-[#20b486] text-white px-4 py-2 rounded-md hover:bg-[#20b43c] flex items-center gap-2"
        >
          Edit
        </button>
        <div className="text-center space-y-1 mb-4">
          <h3 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600 break-words">Email: {user.email}</p>
          <p className="text-gray-600">
            Phone: {user.additionalDetails?.contactNumber ?? "N/A"}
          </p>
          <p className="text-gray-600">
            Gender: {user.additionalDetails?.gender ?? "N/A"}
          </p>
          <p className="text-gray-600">
            Date of Birth: {user.additionalDetails?.dateOfBirth ?? "N/A"}
          </p>
          <p className="text-gray-600">PinCode: {user.pincode}</p>
          <p className="text-gray-600">
            About: {user.additionalDetails?.about ?? "N/A"}
          </p>
          {hardinessZone && (
            <p className="text-green-600 font-medium">Zone: {hardinessZone}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="w-full max-w-[1000px] pb-2">
          <h1 className="text-2xl font-bold mb-4">Suggested Plants</h1>
          {loading ? (
            <p>Loading plant data...</p>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
              <div className="flex space-x-4 w-max">
                {data.map((plant, index) => (
                  <div
                    key={plant.id}
                    className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <PlantTemplate plant={plant} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Garden Section */}
        <div className="w-full max-w-[1000px] pb-2">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          {plants.length > 0 ? (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100 rounded-md">
              <div className="flex space-x-4 w-max">
                {plants.map((p, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 snap-start w-80 bg-white rounded-lg shadow p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <h2 className="text-lg font-semibold text-center">
                      {p?.plant?.name}
                    </h2>
                    <img
                      src={p?.plant?.image}
                      alt={p?.plant?.name}
                      className="mt-2 w-full h-40 object-cover rounded"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Last Soil Change: {p?.lastSoilChanged}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Last Watered: {p?.lastWatered}
                    </p>
                    <button
                      onClick={() => handleDeletePlant(p?.plant?._id)}
                      className="mt-3 w-full bg-[#20b486] text-white py-2 rounded-md hover:bg-[#20b43c] text-sm font-medium"
                    >
                      Delete Plant
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No plants in your garden yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
