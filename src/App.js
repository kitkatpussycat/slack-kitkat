import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContextProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import Body from "./components/Body";
import BodyDirectMessage from "./components/BodyDirectMessage";
import Sidebar from "./components/Sidebar";

function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.login) {
    redirectRoute = <Navigate replace to="dashboard/bodydirectmessage" />;
  } else {
    redirectRoute = <Login />;
  }
  console.log("login", state.login);
  return (
    <div>
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
            <Route
              path="bodydirectmessage/:id"
              element={<BodyDirectMessage />}
            />
            <Route path="bodydirectmessage" element={<BodyDirectMessage />} />
            <Route path="sidebar" element={<Sidebar />}></Route>
          </Route>
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
