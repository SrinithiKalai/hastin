import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import hastin from '../assets/hastin_logo.png';
import userlogo from '../assets/userlogo.png';
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
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success('Logged in successfully');
    }
  }, [location.state]);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleClickOutside = (e) => {
    if (logoutRef.current && !logoutRef.current.contains(e.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='d-none d-md-block'>
        <nav className='navbar navbar-expand-sm'>
          <div className='container-fluid d-flex justify-content-between align-items-center'>
            <a className='navbar-brand' href='#'>
              <img src={hastin} style={{ height: '45px', width: '120px' }} alt='hastin-logo' />
            </a>
            <div className="position-relative" ref={logoutRef}>
              <img
                src={userlogo}
                alt='Profile'
                style={{ height: '45px', width: '45px', borderRadius: '50%', cursor: 'pointer' }}
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="position-absolute" style={{ top: '60px', right: 0, zIndex: 999, width: "175px" }}>
                  <div style={{
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    padding: '10px 15px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    fontWeight: '600'
                  }}>
                    Ebrain Technologies
                  </div>
                  <div style={{
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}>
                    <div
                      className="d-flex align-items-center px-3 py-2 text-danger"
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ fontSize: '18px', marginRight: '10px' }}>⏻</span>
                      <span>LOGOUT</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <nav className='navbar navbar-expand-sm' style={{ boxShadow: '0px 1px 2px 2px rgba(152, 152, 152, 0.54)' }}>
          <div className='container-fluid' style={{ fontSize: '15px' }}>
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
                    color: '#011c69',
                    marginRight: '20px',
                    fontWeight: '500',
                    backgroundColor: name === 'master' ? '#dbeafe' : 'transparent',
                    borderRadius: '5px',
                    padding: '8px 10px',
                    cursor: 'pointer'
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
                    onClick={handleVendorClick}
                    style={{
                      color: '#011c69',
                      marginRight: '20px',
                      fontWeight: '500',
                      backgroundColor: table === 'vendor' ? '#dbeafe' : 'transparent',
                      borderRadius: '5px',
                      padding: '8px 10px',
                      cursor: 'pointer'
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
        <nav className='navbar navbar-light bg-light d-flex justify-content-between px-3 align-items-center'>
          <img src={hastin} alt='Logo' style={{ height: '40px' }} />
          <div className="d-flex align-items-center gap-2">
            <button className='btn p-1' onClick={toggleMenu}>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className="position-relative" ref={logoutRef}>
              <img
                src={userlogo}
                alt='Profile'
                style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="position-absolute" style={{ top: '50px', right: 0, zIndex: 999, width: "160px" }}>
                  <div style={{
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    padding: '10px 15px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    fontWeight: '600'
                  }}>
                    Ebrain Technologies
                  </div>
                  <div style={{
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}>
                    <div
                      className="d-flex align-items-center px-3 py-2 text-danger"
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ fontSize: '18px', marginRight: '10px' }}>⏻</span>
                      <span>LOGOUT</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className='mobile-sidebar'>
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
      <ToastContainer position='top-right' autoClose={2000} />
    </>
  );
}

const navStyle = () => ({
  color: '#011c69',
  marginRight: '20px',
  fontWeight: '500'
});

export default HastinTable;
