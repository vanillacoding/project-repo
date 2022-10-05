import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import useSearch from "../../hooks/useSearch";

function TopNav() {
  const [searchTerm, setSearchTerm] = useState("");
  const updateIsSubmit = useSearch(searchTerm);
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const handleLogout = useLogout();

  return (
    <nav className="nav-top">
      <div>
        <NavLink to="/" className="nav-top__title">Anonym</NavLink>
      </div>
      <div className="nav-top__search-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateIsSubmit(true);
          }}
        >
          <input
            type="text"
            className="input-text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </form>
      </div>
      <div>
        <NavLink to={`/streaming/${userId}`}>Streaming</NavLink>
        <NavLink to={`/user/${userId}`}>My Page</NavLink>
        <NavLink to="/auth/login" onClick={() => handleLogout(true)}>Logout</NavLink>
      </div>
    </nav>
  );
}

export default TopNav;
