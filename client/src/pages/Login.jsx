import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faSignInAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/RST-logo.png";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Heading = styled.div`
  text-align: center;

  img {
    width: 80px;
  }
`;

const LoginForm = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h3 {
    margin-bottom: 24px;
    font-size: 32px;
    text-align: center;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
    font-size: 18px;

    svg {
      margin-left: 8px;
    }
  }
`;

const FormControl = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 24px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-left: 8px;
    position: relative;
    top: 2px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #555;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.span`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  user-select: none;
`;

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "mohamed", password: "123", role: "user" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <LoginContainer>
      <Heading>
        <img src={Logo} alt="Logo" />
        <h2>جامعة الريادة للعلوم والتكنولوجيا</h2>
      </Heading>
      <LoginForm>
        <h3>تسجيل الدخول</h3>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <label>
              <FontAwesomeIcon icon={faUser} />
              اسم المستخدم
            </label>
            <FormControl
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>
              <FontAwesomeIcon icon={faLock} />
              كلمة المرور
            </label>
            <PasswordWrapper>
              <FormControl
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordWrapper>
          </FormGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">
            <FontAwesomeIcon icon={faSignInAlt} />
            تسجيل الدخول
          </Button>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
