import React from "react";
import DashboardPage from "./pages/Dashboard";
import Error from "./pages/Error"; // Renomeei o componente Error para ErrorPage
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* Adicione uma rota para o componente de erro */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
