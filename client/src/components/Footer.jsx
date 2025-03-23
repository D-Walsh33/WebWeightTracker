import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import AboutModal from './AboutModal'



export default function Footer(){
  const [modalShow, setModalShow] = useState(false);

     return (
    <div id='footer'>
      <hr />
      <Container>
        <div id='social'>
        <Navbar.Brand>
          <a href="https://github.com/D-Walsh33">
          <i class="fa-brands fa-github"></i>
          </a>
        </Navbar.Brand>
        <Navbar.Brand>
          <a href="https://www.linkedin.com/in/david-walsh33/">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </Navbar.Brand>
        </div>
        <Navbar.Brand>
          <a  onClick={() => setModalShow(true)}>
            About
          </a>
         - David Walsh - {new Date().getFullYear()}
        </Navbar.Brand>
        <AboutModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </Container>
    </div>
     )
}