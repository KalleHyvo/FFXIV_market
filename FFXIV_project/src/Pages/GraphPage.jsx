import { useLocation } from 'react-router-dom';

export function GraphPage() {
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Get selected item from state

  return (
    <div>
      <h1>This page has graphs</h1>
      {selectedItem ? (
        <div>
          <h2>Selected Item: {selectedItem}</h2>
          {/* Here you can display more detailed info about the item */}
        </div>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}