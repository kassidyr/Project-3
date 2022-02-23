import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <Link to="/donation">Donate to Us</Link>
      <div className="container">&copy;2022 by Spacebook</div>
    </footer>
  );
};

export default Footer;