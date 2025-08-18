import React , { useRef } from 'react';

import { Container , Row , Col } from 'reactstrap';
import { Link , NavLink } from 'react-router-dom';
import logo from '../../assets/all-images/logo.png'; // ✅ Add your logo image
import '../../styles/Header.css' ;
import { useAuth } from '../../context/AuthContext';

const navLinks = [
    { path:'/home', display: 'Home' },
    { path:'/about', display: 'About' },
    { path:'/cars', display: 'Cars' },
    { path:'/blogs', display: 'Blog' },
    { path:'/contact', display: 'Contact' },
];

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const menuRef = useRef(null);
    const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

    return <header className="header">

    {/* Header Top Row */}
    <div className="header__top">
        <Container>
            <Row>
                <Col lg="6" md="6" sm="6">
                    <div className="header__top__left">
                        <span>Need Help?</span>
                        <span className="header__top__help">
                            <i className="ri-phone-fill"></i> +91 12345-67890
                        </span>
                    </div>
                </Col>

                <Col lg="6" md="6" sm="6">
                    <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className='d-flex align-items-center gap-2 btn btn-outline-light'
                            >
                                <i className="ri-logout-box-line"></i> Logout
                            </button>
                        ) : (
                            <Link to='/Login' className='d-flex align-items-center gap-2'>
                                <i className="ri-user-add-line"></i> Signup
                            </Link>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    </div>

    {/* Header Middle */}
    <div className="header__middle">
        <Container>
            <Row>
                <Col lg='4' md='3' sm='4'>
                    <div className="logo">
                        <h1>
                            <Link to='/home' className='d-flex align-items-center gap-2'>
                                <img src={logo} alt="Luxora Rides" className="logo__img" />
                                <span style={{ color: '#6d42c7', fontWeight: '600', textDecoration: 'none' }}>Luxora_Rides</span>
                            </Link>
                        </h1>
                    </div>

                </Col>

                <Col lg='3' md='3' sm='4'>
                    <div className="header__location d-flex align-items-center gap-2">
                        <span><i className="ri-earth-line"></i></span>
                        <div className="header__location-content">
                            <h4>India</h4>
                            <h6>Surat, Gujarat</h6>
                        </div>
                    </div>
                </Col>

                <Col lg='3' md='3' sm='4'>
                    <div className="header__location d-flex align-items-center gap-2">
                        <span><i className="ri-time-line"></i></span>
                        <div className="header__location-content">
                            <h4>Monday to Saturday</h4>
                            <h6>09:00AM - 5:00PM</h6>
                        </div>
                    </div>
                </Col>

                <Col lg='2' md='3' sm='0' className='d-flex align-items-center justify-content-end'>
                    <button className="header__btn btn">
                        <Link to="/contact">
                            <i className="ri-phone-line"></i> Request A Call
                        </Link>
                    </button>
                </Col>
            </Row>
        </Container>
    </div>

    {/* Main Navigation */}
    <div className="main__navbar">
        <Container>
            <div className="navigation__wrapper d-flex align-items-center justify-content-between">
                <span className="mobile__menu">
                    <i className="ri-menu-line" onClick={toggleMenu}></i>
                </span>

                <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                    <div className="menu">
                        {navLinks.map((item, index) => (
                            <NavLink to={item.path} className={navClass => navClass.isActive ? 'nav__active nav__item' : 'nav__item'} key={index}>
                                {item.display}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="nav__right">
                    <div className="search__box">
                        <input type="text" placeholder='Search' />
                        <span>
                            <i className="ri-search-line"></i>
                        </span>
                    </div>
                </div>
            </div>
        </Container>
    </div>
    </header>
};

export default Header;