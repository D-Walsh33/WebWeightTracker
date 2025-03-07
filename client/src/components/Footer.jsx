import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';

export default function Footer(){
     return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >This is the footer!</Navbar.Brand>
      </Container>
    </Navbar>
     )
}