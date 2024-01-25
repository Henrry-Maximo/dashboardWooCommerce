import "./App.css";
import React from "react";
import DashboardPage from "./pages/Dashboard";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Header />
        <DashboardPage />
      </BrowserRouter>
    </Container>
  );
}

export default App;
