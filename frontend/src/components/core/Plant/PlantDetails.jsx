import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { plantEndpoints } from '../../../services/api';

function PlantDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [plant, setPlant] = useState(null);
    const [careGuide, setCareGuide] = useState([]);
    const KEY = import.meta.env.VITE_API_PLANT_KEY;

    useEffect(() => {
        const fetchPlantDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${plantEndpoints.GET_PLANT_BY_ID}/${id}?key=${KEY}`);
                const response2 = await fetch(`${plantEndpoints.GET_PLANT_CARE_GUIDE}&species_id=${id}`);
                const data = await response.json();
                const data2 = await response2.json();
                setPlant(data);
                setCareGuide(data2.data[0]?.section || []);
            } catch (error) {
                console.error('Error fetching plant details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlantDetails();
    }, [id, KEY]);

    if (loading) {
        return (
            <p className="text-center py-20 text-2xl text-gray-500">
                Loading...
            </p>
        );
    }

    if (!plant) {
        return (
            <p className="text-center py-20 text-2xl text-gray-500">
                No data available
            </p>
        );
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    {plant.common_name}
                    <small className="block text-lg text-gray-500">
                        ({plant.scientific_name?.[0]})
                    </small>
                </h1>

                <img
                    src={plant.default_image?.regular_url}
                    alt={plant.common_name}
                    className="w-full max-h-96 object-cover rounded-xl mb-6"
                />

                <p className="text-lg leading-relaxed text-gray-700 mb-8">
                    {plant.description}
                </p>

                <h2 className="text-2xl font-semibold text-green-600 border-b-2 border-green-400 pb-2 mb-4">
                    General Information
                </h2>
                <ul className="list-none space-y-2 text-base text-gray-700">
                    <li><strong>Origin:</strong> {plant.origin?.join(', ')}</li>
                    <li><strong>Type:</strong> {plant.type}</li>
                    <li><strong>Cycle:</strong> {plant.cycle}</li>
                    <li><strong>Growth Rate:</strong> {plant.growth_rate}</li>
                    <li><strong>Sunlight:</strong> {plant.sunlight?.join(', ')}</li>
                    <li><strong>Watering Needs:</strong> {plant.watering}</li>
                    <li><strong>Drought Tolerant:</strong> {plant.drought_tolerant ? "Yes" : "No"}</li>
                    <li><strong>Medicinal:</strong> {plant.medicinal ? "Yes" : "No"}</li>
                    <li><strong>Poisonous to Humans:</strong> {plant.poisonous_to_humans ? "Yes" : "No"}</li>
                    <li><strong>Poisonous to Pets:</strong> {plant.poisonous_to_pets ? "Yes" : "No"}</li>
                </ul>

                <h2 className="text-2xl font-semibold text-green-600 border-b-2 border-green-400 pb-2 mt-10 mb-4">
                    Care Instructions
                </h2>
                {careGuide.length > 0 ? (
                    <div className="space-y-4">
                        {careGuide.map((care) => (
                            <div key={care.id} className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                    {care.type.charAt(0).toUpperCase() + care.type.slice(1)}
                                </h3>
                                <p className="text-gray-700">
                                    {care.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No specific care instructions available.</p>
                )}
            </div>
        </div>
    );
}

export default PlantDetails;
