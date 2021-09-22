import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Assignment Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/todo">
                Todo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  background-color: #222222;
  z-index: 9999;

  .nav-item {
    padding: 0 20px;
  }

  a {
    color: #f5f5f5;
  }

  a:hover {
    color: #f5f5f5;
  }
`;
