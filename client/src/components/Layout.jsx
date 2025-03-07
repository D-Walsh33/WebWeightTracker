// Layout.js
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <Container>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
}

export default Layout;