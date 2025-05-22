import React, { useState } from 'react'
import hastin from '../assets/hastin_logo.png'
import CreateTable from './CreateTable'
import Vendor from './Vendor';

function HastinTable() {
    var [name, setName] = useState('home');
    var [table, setTable] = useState('');

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
                <div className='container-fluid ' style={{ fontSize: "15px" }} >
                    <ul className='navbar-nav d-flex align-items-center'>
                        <li className='nav-item' >
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>INDICATOR</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>HCL</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>FWD</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>FILE MANAGER</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>INVENTORY</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>ACCOUNTS</a>
                        </li>

                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>SOA</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} onClick={() => { setName('master'); setTable('') }} href='#'>MASTERS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>DASHBOARD</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {name === 'master' && (
                <>
                    <Navbar setTable={setTable} />
                    {table === 'vendor' ? <CreateTable setTable={setTable} /> : null}
                    {table === 'vendorDetails' ? <Vendor /> : null}
                </>
            )}
        </div>
    )
}
export default HastinTable;

function Navbar({ setTable }) {
    return (
        <div>
            <nav className='navbar navbar-expand-sm' style={{ fontSize: '15px' }}>
                <div className='containar-fluid'>
                    <ul className='navbar-nav d-flex align-items-center'>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>AGENTS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>CUSTOMERS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>USERS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} onClick={() => setTable('vendor')} href='#'>VENDORS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>DEPOT</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>CFS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>OFFICES</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>JOB LISTING</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' style={{ color: "#011c69", marginRight: "20px", fontWeight: "500" }} href='#'>OTHERS</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
