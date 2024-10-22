import { useContext } from "react";
import { ItemContext } from "../App";

export function GraphPage() {
  // Retrieve the item from context
  const item = useContext(ItemContext);

  return (
    <div>
      <h1>This page has graphs</h1>
      {item ? ( // Check if item is defined
        <div>
          <h2>Selected Item: {item.name}</h2>
          <p>ID: {item.id}</p>
          {/* Here you can display more detailed info about the item */}
        </div>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}