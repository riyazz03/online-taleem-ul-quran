"use client";

import React, { useState } from "react";
import "../css/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo-wrapper">
          <Link href="/">
            <Image
              src="/Images/logo.svg"
              alt="nav-logo"
              className="nav-logo"
              height={72}
              width={165}
            />
          </Link>
        </div>
        <div className="nav-menu-links">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active-link" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/our-course"
            className={`nav-link ${
              pathname === "/our-course" ? "active-link" : ""
            }`}
          >
            Our Courses
          </Link>
          <Link
            href="/about-us"
            className={`nav-link ${
              pathname === "/about-us" ? "active-link" : ""
            }`}
          >
            About us
          </Link>
          <Link
            href="/contact-us"
            className={`nav-link ${
              pathname === "/contact-us" ? "active-link" : ""
            }`}
          >
            Contact us
          </Link>
          <div className="nav-menu-button" onClick={toggleMenu}>
            <div
              className={`nav-menu-circles-wrapper ${
                isMenuOpen ? "active" : ""
              }`}
            >
              <div className="black-circle"></div>
              <div className="black-circle"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`nav-menu-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="nav-menu-overlay-links-wrapper">
          <Link
            href="/"
            className={`overlay-nav-link ${
              pathname === "/" ? "active-link" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Home
          </Link>
          <Link
            href="/our-course"
            className={`overlay-nav-link ${
              pathname === "/our-course" ? "active-link" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Our Courses
          </Link>
          <Link
            href="/about-us"
            className={`overlay-nav-link ${
              pathname === "/about-us" ? "active-link" : ""
            }`}
            onClick={handleCloseMenu}
          >
            About us
          </Link>
          <Link
            href="/contact-us"
            className={`overlay-nav-link ${
              pathname === "/contact-us" ? "active-link" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Contact us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
