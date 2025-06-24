// import "bootstrap/dist/css/bootstrap.min.css";
// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import HastinLogin from "./react-api/HastinLogin";
// import HastinTable from"./react-api/HastinTable"

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Routes>
//      <Route path="/" element={<HastinLogin/>}/>
//      <Route path="table/" element={<HastinTable/>}/>
//       </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HastinLogin from "./react-api/HastinLogin";
import HastinTable from "./react-api/HastinTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // ✅ Font Awesome import

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HastinLogin />} />
          <Route path="/table" element={<HastinTable />} />
        </Routes>
      </BrowserRouter>
      {/* ✅ Toast Container */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}

export default App;
