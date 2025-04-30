import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PlantTemplate from "../components/core/Plant/PlantTemplate";
import { plantEndpoints } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getGardenPlants } from "../services/operations/Garden";

const AllPlants = () => {
  const dispatch=useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
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

  const [showFilters, setShowFilters] = useState(false);

  useEffect(()=>{
    if(!user) return;
    dispatch(getGardenPlants(token));
  },[])

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

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const searchPlantHandler = (e) => {
    e.preventDefault();
    const url = buildURL("search");
    fetchData(url);
  };

  const filterHandler = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
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
    <div className="md:max-w-[1280px] mx-auto px-4 md:px-0 mt-10">
      {/* Search + Filter Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
        <div className="flex items-center w-full md:w-auto justify-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search plant..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:bg-[#20b486]"
            />
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={searchPlantHandler}
            />
          </div>
          <button
            type="button"
            className="ml-4 bg-[#20b486] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <form
          onSubmit={filterPlantHandler}
          className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white w-full md:max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <label>
            Indoor:
            <select name="indoor" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Poisonous:
            <select name="poisonous" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Edible:
            <select name="edible" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
              <option value="">Any</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label>
            Order:
            <select name="order" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>

          <label>
            Sunlight:
            <select name="sunlight" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
              <option value="">Any</option>
              <option value="full_sun">Full Sun</option>
              <option value="full_shade">Full Shade</option>
              <option value="part_shade">Part Shade</option>
              <option value="sun-part_shade">Part Sun</option>
            </select>
          </label>

          <label>
            Watering:
            <select name="watering" onChange={filterHandler} className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full">
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
              placeholder="0"
              min="1"
              max="13"
              className="border border-gray-500 rounded px-2 py-1 mt-1 block w-full"
            />
          </label>

          <div className="col-span-full flex justify-center mt-2">
            <button
              type="submit"
              className="bg-[#20b486] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              Apply Filters
            </button>
          </div>
        </form>
      )}

      {/* Plant Cards */}
      <div className="grid gap-y-4 md:grid-cols-3 mt-6 gap-5">
        {data?.data?.map((plant) => (
          <PlantTemplate key={plant.id} plant={plant}/>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => goToPageHandler(filter.page - 1)}
          disabled={data?.current_page <= 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => goToPageHandler(filter.page + 1)}
          disabled={data?.current_page >= data?.last_page}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPlants;
