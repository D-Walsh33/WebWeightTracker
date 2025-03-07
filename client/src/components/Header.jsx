import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header(){
    return (
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="#">Weight Tracker</Navbar.Brand>
        </Container>
      </Navbar>
    )
}