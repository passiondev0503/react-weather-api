import AppNavbar from './Components/Navbar';
import Weather from './Components/Weather';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Weather />
      <Toaster />
    </div>
  );
}

export default App;
