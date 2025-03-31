import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import TransactionHistoryAll from "./History/Transactionall";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./Pages/ForgetPasswordForm";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [active, setActive] = useState(1);
  const { user } = useGlobalContext(); 

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
        
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/auth" element={<ProtectedRoute />}>
            <Route
              path="dash-board"
              element={
                <AppStyled bg={bg}>
                  <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main>
                      {active === 1 && <Dashboard />}
                      {active === 2 && <TransactionHistoryAll />}
                      {active === 3 && <Income />}
                      {active === 4 && <Expenses />}
                    </main>
                    {orbMemo}
                  </MainLayout>
                </AppStyled>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
