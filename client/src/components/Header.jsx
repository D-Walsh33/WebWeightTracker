import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

export default function Header({isAuthenticated, setIsAuthenticated}){
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
     navigate('/login');
  }
    return (
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Weight Tracker</Navbar.Brand>
          {isAuthenticated && (<Button onClick={handleLogout} variant='link'>Logout</Button>)}
        </Container>
      </Navbar>
    )
}