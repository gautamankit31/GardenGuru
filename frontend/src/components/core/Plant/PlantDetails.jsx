import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { plantEndpoints } from '../../../services/api';

function PlantDetails() {
    const {id}=useParams();
    const [loading ,setLoading]=useState(false);
    const KEY = import.meta.env.VITE_API_PLANT_KEY;
    useEffect(() => {
        const fetchPlantDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${id}?key=${KEY}`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching plant details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlantDetails();
    }
    , []);
    if (loading) return <p>Loading...</p>;
    if (!id) return <p>No data available</p>;

  return (
    <>

    </>
  )
}

export default PlantDetails