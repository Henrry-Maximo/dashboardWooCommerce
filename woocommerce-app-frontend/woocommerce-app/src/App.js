import "./App.css";
import React from "react";
import DashboardPage from "./pages/Dashboard";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
// import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Header />
        <DashboardPage />
        {/* <Login /> */}
      </BrowserRouter>
    </Container>
  );
}

export default App;
