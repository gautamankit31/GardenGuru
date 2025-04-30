import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { plantEndpoints } from "../services/api";

function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_WEATHER_KEY;
  const { user } = useSelector((state) => state.profile);

  const [hardinessZone, setHardinessZone] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.pincode) {
      fetchHardinessZone(user.pincode);
    }
  }, [user.pincode]);

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
      } else {
        throw new Error("Invalid coordinates");
      }
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
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hardinessZone) {
      fetchData(hardinessZone);
    }
  }, [hardinessZone]);

  return (
    <div className="p-4">
      <img
        src={user.image}
        alt="User Avatar"
        className="rounded-full h-[100px] w-[100px]"
      />
      <h3>First Name: {user.firstName}</h3>
      <h3>Last Name: {user.lastName}</h3>
      <p>Email: {user.email}</p>
      <p>PinCode: {user.pincode}</p>

      {hardinessZone && <p>Hardiness Zone: {hardinessZone}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h1 className="text-xl font-bold mt-4">Suggested Plants</h1>

      {loading ? (
        <p>Loading plant data...</p>
      ) : (
        <div className="grid gap-4 mt-2">
          {data.length > 0 ? (
            data.map((plant, index) => (
              <div key={index} className="border p-2 rounded">
                <h2 className="font-semibold">{plant.common_name}</h2>
                <p>{plant.description}</p>
              </div>
            ))
          ) : (
            <p>No plants found for this zone.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
