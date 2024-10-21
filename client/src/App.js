import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ChartOfAccounts from "./pages/ChartOfAccounts";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { lightTheme, darkTheme } from "./utils/Theme";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import Users from "./pages/Users";
import EditUser from "./components/EditUser";
import Unauthorized from "./pages/Unauthorized";
import CashRegisters from "./pages/CashRegisters";
import Banks from "./pages/Banks";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Content = styled.div`
  flex: 1;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          id: decoded.sub,
          name: decoded.name,
          role: decoded.role || "user",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <AppContainer>
          {user && (
            <Sidebar
              user={user}
              onLogout={handleLogout}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
          <Content>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/chart-of-accounts"
                element={
                  <ProtectedRoute
                    user={user}
                    requiredRoles={["admin", "full-access"]}
                  >
                    <ChartOfAccounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute
                    user={user}
                    requiredRoles={["admin", "full-access"]}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  // <ProtectedRoute
                  //   user={user}
                  //   requiredRoles={["admin", "full-access"]}
                  // >
                    <Register />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <ProtectedRoute
                    user={user}
                    requiredRoles={["admin", "full-access"]}
                  >
                    <EditUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cash-registers"
                element={
                  <ProtectedRoute
                    user={user}
                    requiredRoles={["admin", "full-access"]}
                  >
                    <CashRegisters />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/banks"
                element={
                  <ProtectedRoute
                    user={user}
                    requiredRoles={["admin", "full-access"]}
                  >
                    <Banks />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
