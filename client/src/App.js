import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ChartOfAccounts from "./pages/ChartOfAccounts";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CashRegister from "./pages/CashRegister";
import NotFound from "./pages/NotFound";
import { lightTheme, darkTheme } from "./utils/Theme";
import styled from "styled-components";

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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    localStorage.removeItem("user");
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
              <Route
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chart-of-accounts"
                element={
                  <ProtectedRoute user={user} requiredRole="admin">
                    <ChartOfAccounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cash-register"
                element={
                  <ProtectedRoute user={user} requiredRole="admin">
                    <CashRegister />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
