import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header: React.FC = () => {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Cadastros</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Início</Nav.Link>
              <Nav.Link href="#link">Cadastro Alunos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    );
}

export default Header;