
// src/Pages/SearchPage.jsx
import SearchableDropdown from "../SearchableDropdown";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importing Bootstrap components
import "../styles.css";
import Papa from "papaparse";
import item from "../item"
import ItemIDName from "../ItemIDName.csv";
import { ItemContext } from "../App";




function SearchPage() {
  const [value, setValue] = useState("Select option...");
  const [options, setOptions] = useState([]);
  const { setSelectedItem } = useContext(ItemContext);
  useEffect(() => {
    const fetchParseData = async () => {
      const dropdown = [];
      const data = await fetch(ItemIDName)
      const blob = await data.blob();
      Papa.parse(blob, {
        download: true,
        delimiter: ';',
        worker: true, // Enable worker for better performance
        step: (results) => {
          const item = results.data;
          if (item.length > 1) {
            dropdown.push({
              id: item[0],
              name: item[1],
            });
          }
        },
        complete: () => {
          setOptions(dropdown);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        }
      });
    };
  
    fetchParseData();
  }, []);
  const handleDropdownChange = (val) => {
    const selectedItem = options.find(option => option.name === val); // Find selected item from options
    setSelectedItem(selectedItem); // Update context with selected item
    setValue(val); // Update local state with selected value
  };

  return (
    
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Search Items</Card.Title>
              
              <div className="SearchPage" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SearchableDropdown
                  options={options}
                  label="name"
                  id="id"
                  selectedVal={value}
                  handleChange={handleDropdownChange}
                />
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

export default SearchPage;
