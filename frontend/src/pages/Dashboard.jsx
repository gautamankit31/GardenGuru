import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plantEndpoints } from "../services/api";
import { addPlantToTheGarden } from "../services/operations/Garden";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_WEATHER_KEY;
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hardinessZone, setHardinessZone] = useState("");
  const [data, setData] = useState([]);
  const [visiblePlants, setVisiblePlants] = useState(3);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.pincode) {
      fetchHardinessZone(user.pincode);
    }
  }, [user?.pincode]);

  const plantDetailsHandler = (plant) => {
    if (!plant?.id) return;
    console.log(plant)
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

  useEffect(() => {
    if (hardinessZone) fetchData(hardinessZone);
  }, [hardinessZone]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <div className="md:w-1/4 w-full bg-white rounded-lg shadow p-4">
          <img
            src={user.image}
            alt="User Avatar"
            className="rounded-full h-[100px] w-[100px] mx-auto mb-4"
          />
          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">PinCode: {user.pincode}</p>
            {hardinessZone && (
              <p className="text-green-600 font-medium">Zone: {hardinessZone}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* Plants Section */}
        <div className="md:w-3/4 w-full">
          <h1 className="text-2xl font-bold mb-4">Suggested Plants</h1>
          {loading ? (
            <p>Loading plant data...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.slice(0, visiblePlants).map((plant, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
                >
                  <h2
                    className="text-lg font-semibold text-center hover:underline cursor-pointer"
                    onClick={() => plantDetailsHandler(plant)}
                  >
                    {plant.common_name}
                  </h2>
                  {/* <p className="text-gray-600">{plant.description}</p> */}
                  <img
                    src={plant.default_image?.thumbnail || plant.default_image?.original_url}
                    alt={plant.common_name}
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-[#20b486] text-white px-4 py-2 rounded-full hover:bg-[#17996f] transition"
                      onClick={() =>
                        dispatch(
                          addPlantToTheGarden(
                            plant.id,
                            plant.common_name,
                            plant.default_image?.medium_url,
                            0,
                            0,
                            token
                          )
                        )
                      }
                    >
                      Add to Garden
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* See More Button */}
          {visiblePlants < data.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisiblePlants(data.length)}
                className="text-blue-600 font-semibold hover:underline"
              >
                See More Plants
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
