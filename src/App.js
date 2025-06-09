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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HastinLogin from "./react-api/HastinLogin";
import HastinTable from "./react-api/HastinTable";
import CreateTable from "./react-api/CreateTable";
import Vendor from "./react-api/Vendor";
import React, { useState } from "react";

// Remove <link .../> from here, use it in public/index.html if needed

function App() {
  const [table, setTable] = useState('table');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleSetTable = (view, vendor) => {
    setTable(view);
    setSelectedVendor(vendor || null);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HastinLogin />} />
          <Route path="table/" element={<HastinTable />} />
          {/* If you want to use SPA navigation for CreateTable & Vendor */}
          <Route
            path="/vendors"
            element={
              table === 'table' ? (
                <CreateTable setTable={handleSetTable} />
              ) : (
                <Vendor selectedVendor={selectedVendor} isEditMode={!!selectedVendor} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;