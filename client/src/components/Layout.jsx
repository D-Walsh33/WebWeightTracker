// Layout.js
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "./Header";
import Footer from "./Footer";

function Layout({isAuthenticated,setIsAuthenticated}) {
  return (
    <Container>
      <Header isAuthenticated={isAuthenticated}setIsAuthenticated={setIsAuthenticated}/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
}

export default Layout;