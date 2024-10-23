import React, { useEffect, useRef, useState } from 'react';

const SalesInfo = ({ ItemID }) => {
    const [avgPrice, setAvgPrice] = useState(0); // Initialize avgPrice as 0
    const [quantity, setQuantity] = useState(0); // Initialize quantity as 0
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track any errors
   
    const [listed, setLised] = useState(0);
    const [sold, setSold] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://universalis.app/api/v2/Europe/${ItemID}?fields=currentAveragePriceNQ,currentAveragePriceHQ,minPrice,maxPrice,unitsForSale,unitsSold`);

                if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                }

                const result = await response.json();

                // Log the fetched data
                console.log(result);

                // Update state with fetched data
                setAvgPrice(result.currentAveragePriceNQ); // Use the appropriate field based on the API response
                setQuantity(result.unitsForSale); // Use the appropriate field based on the API response
                setLised(result.unitsForSale);
                setSold(result.unitsSold);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message); // Set error message in state
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();

        // Cleanup if necessary (not strictly needed here)
        return () => {
            // Cleanup logic if needed
        };
    }, [ItemID]); // Depend on ItemID

    // Conditional rendering based on loading and error states
    if (loading) {
        return <p>Loading sales info...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <p>Average Price: {avgPrice} Quantity Available: {quantity}</p>
            <p>Units listed: {listed} Units sold in last week: {sold}</p>
        </div>
    );
};

export default SalesInfo;