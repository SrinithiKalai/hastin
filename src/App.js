import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HastinLogin from "./react-api/HastinLogin";
import HastinTable from"./react-api/HastinTable"

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
     <Route path="/" element={<HastinLogin/>}/>
     <Route path="table/" element={<HastinTable/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
