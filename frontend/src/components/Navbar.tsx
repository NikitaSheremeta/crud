import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="list">
        <li className="list__item">
          <NavLink
            to="/create"
            className="button button--small button--success"
          >
            Add appliance
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
