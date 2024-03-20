import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
// import Registration from "./pages/Registration/Registration.js"

import Error from './pages/Error/Error.js';
import ProtectedRouter from './ProtectedRouter.js';

function App() {
  return (
    <>
      <Routes> {/* Organização das rotas dentro do componente Routes */}
        <Route element={<ProtectedRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/sobre" element={<Home />} />
          <Route path="/*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/registration" element={<Registration />} /> */}
      </Routes>
    </>
  );
}

export default App;
