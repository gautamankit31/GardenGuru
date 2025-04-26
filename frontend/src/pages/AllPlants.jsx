import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PlantTemplate from "../components/core/Plant/PlantTemplate";
import { plantEndpoints } from "../services/api";

const AllPlants = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    indoor: "",
    poisonous: "",
    edible: "",
    order: "",
    sunlight: "",
    watering: "",
    hardiness: "",
  });

  const buildURL = (mode = "initial") => {
    let url = `${plantEndpoints.GET_ALL_PLANTS}&`;
  
    if ((mode === "search" || mode === "nextPage" || mode === "prevPage") && searchValue.trim()) {
      url += `q=${searchValue}&`;
    }
  
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        url += `${key}=${value}&`;
      }
    });
  
    if (mode === "nextPage" && data?.current_page < data?.last_page) {
      url += `page=${data.current_page + 1}&`;
    }
  
    if (mode === "prevPage" && data?.current_page > 1) {
      url += `page=${data.current_page - 1}&`;
    }
    return url;
  };
  

  const fetchData = async (searchLink) => {
    setLoading(true);
    try {
      console.log(searchLink)
      const response = await fetch(`${searchLink}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(buildURL("initial"));
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const searchPlantHandler = (e) => {
    e.preventDefault();
    const url = buildURL("search");
    fetchData(url);
  };

  const filterHandler = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const filterPlantHandler = (e) => {
    e.preventDefault();
    const url = buildURL("filter");
    fetchData(url);
  };

  const goToPageHandler = (newPage) => {
    setFilter((prev) => {
      const updated = { ...prev, page: newPage };
      const url = buildURL(searchValue, updated);
      fetchData(url);
      return updated;
    });
  };
  
  if (loading) return <p>Loading...</p>;
  if (!data?.data || data.data.length === 0) return <p>No data found</p>;

  return (
    <>
      <div className="md:max-w-[1280px] mx-auto px-4 md:px-0 mt-10">
        <div className="flex justify-center mb-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search plant..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:border-green-500"
            />
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={searchPlantHandler}
            />
          </div>
        </div>

        <form onSubmit={filterPlantHandler} className="space-y-2">
          <label>
            Indoor:
            <select name="indoor" onChange={filterHandler}>
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Poisonous:
            <select name="poisonous" onChange={filterHandler}>
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Edible:
            <select name="edible" onChange={filterHandler}>
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Order:
            <select name="order" onChange={filterHandler}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>

          <label>
            Sunlight:
            <select name="sunlight" onChange={filterHandler}>
              <option value="">Any</option>
              <option value="full_sun">Full Sun</option>
              <option value="full_shade">Full Shade</option>
              <option value="part_shade">Part Shade</option>
              <option value="sun-part_shade">Part Sun</option>
            </select>
          </label>

          <label>
            Watering:
            <select name="watering" onChange={filterHandler}>
              <option value="">Any</option>
              <option value="frequent">Frequent</option>
              <option value="average">Average</option>
              <option value="minimum">Minimum</option>
              <option value="none">None</option>
            </select>
          </label>

          <label>
            Hardiness:
            <input
              type="number"
              name="hardiness"
              onChange={filterHandler}
              min="1"
              max="13"
            />
          </label>

          <button type="submit">Filter</button>
        </form>

        <div className="grid gap-y-4 md:gap-y-0 md:grid-cols-2 mt-6">
          {data?.data?.map((plant) => (
            <PlantTemplate key={plant.id} plant={plant} />
          ))}
        </div>
        <button onClick={() => goToPageHandler(filter.page - 1)}>Previous</button>
        <button onClick={() => goToPageHandler(filter.page + 1)}>Next</button>
      </div>
    </>
  );
};

export default AllPlants;
