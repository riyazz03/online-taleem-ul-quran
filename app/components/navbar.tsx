'use client';

import React, { useState, useEffect } from 'react';
import '../css/navbar.css';
import Image from "next/image";
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo-wrapper">
                    <Image
                        src="/images/temp-logo.png"
                        alt="nav-logo"
                        className="nav-logo"
                        height={72}
                        width={165}
                    />
                </div>
                <div className="nav-menu-links">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/our-course" className="nav-link">Our Courses</Link>
                    <Link href="/about-us" className="nav-link">About us</Link>
                    <Link href="/contact-us" className="nav-link">Contact us</Link>
                    <div className="nav-menu-button" onClick={toggleMenu}>
                        <div className={`nav-menu-circles-wrapper ${isMenuOpen ? 'active' : ''}`}>
                            <div className="black-circle"></div>
                            <div className="black-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`nav-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
                <div className="nav-menu-overlay-links-wrapper">
                    <Link href="/" className="overlay-nav-link">Home</Link>
                    <Link href="/our-course" className="overlay-nav-link">Our Courses</Link>
                    <Link href="/about-us" className="overlay-nav-link">About us</Link>
                    <Link href="/contact-us" className="overlay-nav-link">Contact us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
