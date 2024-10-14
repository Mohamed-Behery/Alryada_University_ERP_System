import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Message = styled.p`
  font-size: 24px;
  text-align: center;
  color: red;
`;

const Home = styled(Link)``;

const ProtectedRoute = ({ user, children, requiredRole }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Container>
        <Message>
          ليس لديك الصلاحية للدخول إلى هذه الصفحة.
          <br />
          <Home to="/">العودة إلى الصفحة الرئيسية</Home>
        </Message>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
