import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from "../App";




export function ReferencePage() {
  // Retrieve the selectedItem from context
  const { selectedItem } = useContext(ItemContext);

  // State for fetched data and error handling
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const jobArray = ["ADV","GLA","PGL","MRD","LNC","ARC","CNJ","THM","CRP","BSM",
                    "ARM","GSM","LTW","WVR","ALC","CUL","MIN","BTN","FSH","PLD",
                    "MNK","WAR","DRG","BRD","WHM","BLM","ACN","SMN","SCH","ROG",
                    "NIN","MCH","DRK","AST","SAM","RDM","BLU","GNB","DNC","RPR",
                    "SGE","VPR","PCT"];
  useEffect(() => {
    // Fetch data if an item is selected
    const fetchItemData = async () => {
      if (!selectedItem || !selectedItem.id) return;

      setLoading(true);
      setError(null);

      try {
        // Replace 'YOUR_API_KEY' with your actual API key if required
        const response = await fetch(`https://xivapi.com/Item/${selectedItem.id}`);
      
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the response JSON and store it in state
        const data = await response.json();
        setData(data);
        console.log(data)
        
        if (data.Recipes && data.Recipes.length > 0) {
          console.log("Working")
          const recipeResponse = await fetch(`https://beta.xivapi.com/api/1/search?sheets=Recipe&query=ItemResult.Name~"${selectedItem.name}"&fields=AmountIngredient,Ingredient`);
          if (!recipeResponse.ok) {
            throw new Error(`Error fetching recipe data: ${recipeResponse.status} ${recipeResponse.statusText}`);
          }
          
          const recipeData = await recipeResponse.json();
          setRecipeData(recipeData); // Store detailed recipe data
          console.log(recipeData)
        }
        else{console.log("no work")}


      } catch (err) {
        console.error('Error fetching item data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchItemData();
  }, [selectedItem]);

  return (
    <div>
      <h1>This page has references</h1>
      {selectedItem ? (
        <div>
          <h2>Selected Item: {selectedItem.name}</h2>
          <p>ID: {selectedItem.id}</p>

          {loading && <p>Loading data...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {data && (
            <div>
              <p>{data.Description}</p>

              {/* Display ClassJobCategory and Recipes if ClassJobCategory is not null */}
              {data.ClassJobCategory && (
                <div>
                  <p><strong>Class Job Category:</strong> {data.ClassJobCategory.Name}</p>
                  
                  {/* Display recipes if available */}
                  {data.Recipes && data.Recipes.length > 0 && (
                    <div>
                      <h3>Recipes</h3>
                      <ul>
                        {data.Recipes.map((recipe) => (
                          <li key={recipe.ID}>
                            <p><strong>Recipe ID:</strong> {recipe.ID}</p>
                            <p><strong>Required Level:</strong> {recipe.Level}</p>
                            <p><strong>Required crafter:</strong> {jobArray.at(recipe.ClassJobID)}</p>
                            {/* Display other recipe details as needed */}
                          </li>
                        ))}

                        {/* Render ingredients if recipeData is available */}
                        {recipeData && recipeData.results[0].fields.Ingredient
                            .map((ingredient, index) => ({
                              ingredient, amount: recipeData.results[0].fields.AmountIngredient[index]}))
                              .filter(({ ingredient, amount }) => ingredient.row_id !== 0 && amount !== 0)
                              .map(({ ingredient, amount }) => (
                            <li key={ingredient.row_id}>
                            {amount}x {ingredient.fields.Name} (Id: {ingredient.row_id})
                            </li>))}

                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}