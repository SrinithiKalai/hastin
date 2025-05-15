import React, { useState } from 'react';
import hastin from "../assets/hastin_logo.png";
import Table from './Table';

function Navbar() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const click = () => {
        setOpen(!open);
    };

    const handleClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div>
            <nav style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "1000" }}>
                <div style={{ backgroundColor: "#fff", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", padding: "20px", width: "100%", height: "80px" }}>
                    <img src={hastin} style={{ width: "200px", height: "50px" }} alt="Hastin Logo" />
                </div>
                <div style={{ backgroundColor: "#f5f5f5", padding: "10px 0", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", width: "100%", height: "60px", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: "20px" }}>
                    <span style={{ marginRight: "20px" }}>INDICATOR</span>
                    <span style={{ marginRight: "20px" }}>HCL</span>
                    <span style={{ marginRight: "20px" }}>FWD</span>
                    <span style={{ marginRight: "20px" }}>FILE MANAGER</span>
                    <span style={{ marginRight: "20px" }}>SCHEDULE</span>
                    <span style={{ marginRight: "20px" }}>INVENTORY</span>
                    <span style={{ marginRight: "20px" }}>ACCOUNTS</span>
                    <span style={{ marginRight: "20px" }}>SOA</span>
                    <span style={{ marginRight: "20px", cursor: "pointer", color: open ? "blue" : "black" }} onClick={click}>MASTERS</span>
                    <span>DASHBOARD</span>
                </div>
                {open && (
                     <div style={{position: "sticky",top: "80px", padding: "10px 0",boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", width: "100%",height: "60px",display: "flex",justifyContent: "flex-start",alignItems: "center",paddingLeft: "20px",backgroundColor: "#f5f5f5",zIndex: 999}}>
                        <span style={{ marginRight: "20px" }}>AGENTS</span>
                        <span style={{ marginRight: "20px" }}>CUSTOMERS</span>
                        <span style={{ marginRight: "20px" }}>USERS</span>
                        <span style={{ marginRight: "20px", cursor: "pointer", color: selectedItem ? "blue" : "black" }} onClick={() => handleClick('VENDORS')}>VENDORS</span>
                        <span style={{ marginRight: "20px" }}>DEPOT</span>
                        <span style={{ marginRight: "20px" }}>CFS</span>
                        <span style={{ marginRight: "20px" }}>OFFICES</span>
                        <span style={{ marginRight: "20px" }}>JOB LISTING</span>
                        <span>OTHERS</span>
                    </div>
                )}
            </nav>

            <div style={{ marginTop: "220px", padding: "20px" }}>
                {selectedItem === 'VENDORS' && <Table />}
            </div>
        </div>
    );
}

export default Navbar;
