import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import SearchPage from './Pages/searchPage';
import { ReferencePage } from './Pages/referencePage'
import { GraphPage } from './Pages/GraphPage';
import PageNav from './Components/PageNav';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      {/* Navbar component */}
      <PageNav/> 

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/reference" element={<ReferencePage />} />
      </Routes>
    </Router>
  );
}

export default App;
