import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';



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
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const handleDropdownChange = (option) => {
    console.log("Success")
    navigate('/graphs', { state: { selectedItem: option } }); // Navigate to GraphPage and pass the selected item
  };
  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
    console.log(option)
    handleDropdownChange(option)
    setIsOpen(false); 
  };

  function toggle(e) {
    if (e && e.target === inputRef.current) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(false); 
    }
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const filter = (options) => {
    return options.filter((option) => {
      
      return option[label] && option[label].toLowerCase().indexOf(query.toLowerCase()) > -1;
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
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null); 
              setIsOpen(e.target.value.length > 0); 
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      
      <div className={`options ${isOpen && shouldShowOptions ? "open" : ""}`}>
        {shouldShowOptions && filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      
        {isOpen && !filter(options).length && (
          <div className="option">No options found</div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;