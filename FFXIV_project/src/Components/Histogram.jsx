import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const SalesHistoryChart = ({ ItemID }) => {
    const chartRef = useRef(null);  // Create a ref for the canvas element
    const chartInstanceRef = useRef(null);  // Ref to store the chart instance
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the sales history data for the given ItemID
                const response = await fetch(`https://universalis.app/api/v2/history/Europe/${ItemID}?entriesToReturn=99999&minSalePrice=0&maxSalePrice=2147483647`);

                if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                }

                const result = await response.json();

                // Get the current timestamp in milliseconds
                const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds

                // Filter entries for the past week
                const weekData = result.entries.filter(entry => (entry.timestamp * 1000) >= oneWeekAgo);

                // If weekData is empty or invalid, log for debugging
                if (!weekData || weekData.length === 0) {
                    console.log('No data found for the past week.');
                    return;  // Exit if there's no data to display
                }

                // Prepare data for the chart
                const dates = [];
                const prices = [];

                weekData.forEach(entry => {
                    const saleDate = new Date(entry.timestamp * 1000); // Convert Unix epoch (in seconds) to JS Date (milliseconds)
                    const dateStr = saleDate.toLocaleDateString(); // Format date
                    dates.push(dateStr);
                    prices.push(entry.pricePerUnit);
                });

                // Reverse the arrays to flip the data points
                const flippedDates = dates.reverse();
                const flippedPrices = prices.reverse();

                // Log the dates and prices to debug
                console.log('Flipped Dates:', flippedDates);
                console.log('Flipped Prices:', flippedPrices);

                // If there's an existing chart, destroy it before creating a new one
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');  // Get context from the canvas ref
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',  // Change chart type to 'line'
                    data: {
                        labels: flippedDates, // Use flipped dates as labels
                        datasets: [{
                            label: 'Price Per Stack sold',
                            data: flippedPrices, // Use flipped prices as data points
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2, // Make line thicker
                            fill: false, // Fill under the line
                            tension: 0.3, // Smooth the line (0 = straight lines, 1 = max smoothness)
                        }]
                    },
                    options: {
                        responsive: true, // Make the chart responsive
                        maintainAspectRatio: false, // Allow custom height and width
                        layout: {
                            padding: {
                                left: 1,
                                right: 1,
                                top: 10,
                                bottom: 10 // Reduce padding around the chart
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date' // Add title for x-axis
                                },
                                ticks: {
                                    autoSkip: true, // Automatically skip some ticks for better display
                                    maxTicksLimit: 7 // Limit the number of ticks on x-axis
                                },
                                type: 'category' // Set x-axis to category type for date strings
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price Per Unit' // Add title for y-axis
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [ItemID]);  // Run the effect when ItemID changes

    return (
        <div style={{ width: '1200px', height: '400px' }}> {/* Set a smaller width and height */}
            <canvas ref={chartRef} width="1200" height="400"></canvas>
        </div>
    );
};

export default SalesHistoryChart;