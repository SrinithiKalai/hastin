import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Navbar from './api/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './api/Login';
import Vendor from './api/Vendor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/vendorPage' element={<Vendor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
