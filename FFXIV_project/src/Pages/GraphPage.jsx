import { useContext } from "react";
import { ItemContext } from "../App";

export function GraphPage() {
  // Retrieve the item and setSelectedItem from context
  const { selectedItem } = useContext(ItemContext);  // Destructure to get the selectedItem

  return (
    <div>
      <h1>This page has graphs</h1>
      {selectedItem ? ( // Check if selectedItem is defined
        <div>
          <h2>Selected Item: {selectedItem.name}</h2>
          <p>ID: {selectedItem.id}</p>
          {/* Display more detailed info about the item if needed */}
        </div>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}