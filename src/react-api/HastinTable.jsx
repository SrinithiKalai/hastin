import React, { useState } from 'react';
import hastin from '../assets/hastin_logo.png';
import CreateTable from './CreateTable';
import Vendor from './Vendor';
import './TableHastin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HastinTable() {
    const [name, setName] = useState('home');
    const [table, setTable] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMasterSubMenu, setShowMasterSubMenu] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setShowMasterSubMenu(false);
    };

    const handleMasterClick = () => {
        setShowMasterSubMenu(true);
    };

    const handleVendorClick = () => {
        setTable('vendor');
        setIsMobileMenuOpen(false);
        setShowMasterSubMenu(false);
        toast.success('Vendor fetched successfully');
    };

    return (
        <>
            <div className='d-none d-md-block'>
                <nav className='navbar navbar-expand-sm'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='#'>
                            <img src={hastin} style={{ height: "45px", width: "120px" }} alt="hastin-logo" />
                        </a>
                    </div>
                </nav>

                <nav className='navbar navbar-expand-sm' style={{ boxShadow: "0px 1px 2px 2px rgba(152, 152, 152, 0.54)" }}>
                    <div className='container-fluid' style={{ fontSize: "15px" }}>
                        <ul className='navbar-nav d-flex align-items-center'>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>INDICATOR</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>HCL</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>FWD</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>FILE MANAGER</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>INVENTORY</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>ACCOUNTS</a></li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>SOA</a></li>
                            <li className='nav-item'>
                                <a className='nav-link'
                                    onClick={() => { setName('master'); setTable(''); }}
                                    style={{
                                        color: "#011c69",
                                        marginRight: "20px",
                                        fontWeight: "500",
                                        backgroundColor: name === 'master' ? '#dbeafe' : 'transparent',
                                        borderRadius: "5px",
                                        padding: "8px 10px",
                                        cursor: "pointer"
                                    }}>MASTERS</a>
                            </li>
                            <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>DASHBOARD</a></li>
                        </ul>
                    </div>
                </nav>

                {name === 'master' && (
                    <nav className='navbar navbar-expand-sm' style={{ fontSize: '15px' }}>
                        <div className='container-fluid'>
                            <ul className='navbar-nav d-flex align-items-center'>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>AGENTS</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>CUSTOMERS</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>USERS</a></li>
                                <li className='nav-item'>
                                    <a className='nav-link'
                                        onClick={() => {
                                            setTable('vendor');
                                            toast.success('Vendor fetched successfully');
                                        }}
                                        style={{
                                            color: "#011c69",
                                            marginRight: "20px",
                                            fontWeight: "500",
                                            backgroundColor: table === 'vendor' ? '#dbeafe' : 'transparent',
                                            borderRadius: "5px",
                                            padding: "8px 10px",
                                            cursor: "pointer"
                                        }}>VENDORS</a>
                                </li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>DEPOT</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>CFS</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>OFFICES</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>JOB LISTING</a></li>
                                <li className='nav-item'><a className='nav-link' style={navStyle()} href='#'>OTHERS</a></li>
                            </ul>
                        </div>
                    </nav>
                )}
            </div>

            <div className='d-md-none'>
                <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
                    <img src={hastin} alt="Logo" style={{ height: "40px" }} />
                    <button className="btn" onClick={toggleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>

                {isMobileMenuOpen && (
                    <div className="mobile-sidebar">
                        {!showMasterSubMenu ? (
                            <>
                                <p onClick={() => setIsMobileMenuOpen(false)}>INDICATOR</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>HCL</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>FWD</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>FILE MANAGER</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>INVENTORY</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>ACCOUNTS</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>SOA</p>
                                <p onClick={handleMasterClick}>MASTERS ➤</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>DASHBOARD</p>
                            </>
                        ) : (
                            <>
                                <p onClick={() => setShowMasterSubMenu(false)}>← Back</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>AGENTS</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>CUSTOMERS</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>USERS</p>
                                <p onClick={handleVendorClick}>VENDORS</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>DEPOT</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>CFS</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>OFFICES</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>JOB LISTING</p>
                                <p onClick={() => setIsMobileMenuOpen(false)}>OTHERS</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            {table === 'vendor' && <CreateTable setTable={setTable} />}
            {table === 'vendorDetails' && <Vendor setTable={setTable} />}


            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
}

const navStyle = () => ({
    color: "#011c69",
    marginRight: "20px",
    fontWeight: "500"
});

export default HastinTable;

