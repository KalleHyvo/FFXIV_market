
import React  from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import SearchPage from './Pages/searchPage';
import { ReferencePage } from './Pages/referencePage'
import PageNav from './Components/PageNav';
import { GraphPage } from './Pages/graphPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';


// Create UserContext
export const ItemContext = createContext();

function App() {
  const [selectedItem, setSelectedItem] = useState(null); // State to hold selected item
  
  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      <Router>
        {/* Navbar component */}
        <PageNav /> 

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/reference" element={<ReferencePage />} />
        </Routes>
      </Router>
    </ItemContext.Provider>
  );
}

export default App;
