import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    //overrides the <a> element's default of having the browser load a different resource
    event.preventDefault();
    //removes token from localStorage and refreshes the application to take the user back to the login page
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center header-background">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>spacebook</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">My Dashboard</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
