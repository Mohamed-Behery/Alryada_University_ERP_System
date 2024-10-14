import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

function NotFound() {
  return (
    <Container>
      <Message>
        الصفحة غير موجودة <br />
        <Home to="/">العودة إلى الصفحة الرئيسية</Home>
      </Message>
    </Container>
  );
}

export default NotFound;
