import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContextProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import Body from "./components/Body";

function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.login) {
    redirectRoute = <Navigate replace to="dashboard" />;
  } else {
    redirectRoute = <Login />;
  }
  console.log("login", state.login);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={redirectRoute} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="body/:id" element={<Body />} />
          </Route>
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
