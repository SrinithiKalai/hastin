import React, { useState } from 'react';
import hastin from '../assets/hastin_logo.png';
import CreateTable from './CreateTable';
import Vendor from './Vendor';

function HastinTable() {
    const [name, setName] = useState('home');
    const [table, setTable] = useState('');

    return (
        <div>
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
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>INDICATOR</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>HCL</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>FWD</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>FILE MANAGER</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>INVENTORY</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>ACCOUNTS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>SOA</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#' onClick={() => { setName('master'); setTable(''); }} style={{ color: "#011c69", marginRight: "20px", fontWeight: "500", backgroundColor: name === 'master' ? '#dbeafe' : 'transparent', borderRadius: "5px", padding: "8px 10px" }}>MASTERS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={navStyle()} href='#'>DASHBOARD</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {name === 'master' && (
                <>
                    <nav className='navbar navbar-expand-sm' style={{ fontSize: '15px' }}>
                        <div className='container-fluid'>
                            <ul className='navbar-nav d-flex align-items-center'>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>AGENTS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>CUSTOMERS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>USERS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#' onClick={() => setTable('vendor')} style={{ color: "#011c69", marginRight: "20px", fontWeight: "500", backgroundColor: table === 'vendor' ? '#dbeafe' : 'transparent', borderRadius: "5px", padding: "8px 10px" }} >VENDORS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>DEPOT</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>CFS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>OFFICES</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>JOB LISTING</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' style={navStyle()} href='#'>OTHERS</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {table === 'vendor' && <CreateTable setTable={setTable} />}
                    {table === 'vendorDetails' && <Vendor />}
                </>
            )}
        </div>
    );
}

// Reusable style for nav links
const navStyle = () => ({ color: "#011c69", marginRight: "20px", fontWeight: "500" });

export default HastinTable;
