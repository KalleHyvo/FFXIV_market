import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Event listener to toggle the dropdown open/close on click outside
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  // Handle selecting an option
  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);  // Pass the selected label to the handler
    setIsOpen(false); 
  };

  // Handle toggling dropdown open/close
  function toggle(e) {
    if (e && e.target === inputRef.current) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(false); 
    }
  }

  // Get the display value for the input (either selectedVal or query)
  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  // Filter options based on the query
  const filter = (options) => {
    return options.filter((option) => {
      return option[label] && option[label].toLowerCase().includes(query.toLowerCase());
    });
  };

  const shouldShowOptions = query && filter(options).length > 0;

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}  // Display query or selected value
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);  // Update query as user types
              handleChange(null);  // Clear the selected item while typing
              setIsOpen(e.target.value.length > 0);  // Open dropdown only if input is not empty
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      {/* Show dropdown options */}
      <div className={`options ${isOpen && shouldShowOptions ? "open" : ""}`}>
        {shouldShowOptions && filter(options).map((option, index) => (
          <div
            onClick={() => selectOption(option)}  // Handle option selection
            className={`option ${option[label] === selectedVal ? "selected" : ""}`}
            key={`${id}-${index}`}
          >
            {option[label]}
          </div>
        ))}

        {isOpen && !filter(options).length && (
          <div className="option">No options found</div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;