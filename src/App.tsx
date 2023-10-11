import React from 'react';
import AppNavbar from './Components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from './Api/store';
import { Button } from 'react-bootstrap';
import { RequestLocation } from './Api/Requests';
import Weather from './Components/Weather';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Weather />
    </div>
  );
}

export default App;
