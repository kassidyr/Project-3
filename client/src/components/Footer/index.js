import React from 'react';
import './index.scss'
// import { Container, Wrapper, Row, Column, Link, Title } from './styles/footer'

const Footer = ({children,...restProps}) => {
  return (
    <footer className=" foot bg-secondary mb-4 py-2 flex-row align-center">
    
      {/* className="bg-secondary mb-4 py-2 flex-row align-center" */}
      <div className="container flex-row justify-space-center-lg justify-center align-center">
      
<div className="sbook">&copy;2022 by Spacebook</div>
        <div className="footer-nav">  
        
          <a className='footer-link'>Github</a>
          <a className='footer-link'>Contact</a>
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link> */}
        </div>
      </div>
    
    </footer>
  );
};

export default Footer;

// export default function Footer({children,...restProps}) {
//   return <Container {...restProps}>{children}</Container>
// }

// Footer.Wrapper = function FooterWrapper({children,...restProps}) {
//   return <Wrapper {...restProps}>{children}</Wrapper>
// }

// Footer.Row = function FooterRow({children,...restProps}) {
//   return <Row {...restProps}>{children}</Row>
// }

// Footer.Column = function FooterColumn({children,...restProps}) {
//   return <Column {...restProps}>{children}</Column>
// }

// Footer.Link = function FooterLink({children,...restProps}) {
//   return <Link {...restProps}>{children}</Link>
// }

// Footer.Title = function FooterTitle({children,...restProps}) {
//   return <Title {...restProps}>{children}</Title>
// }