import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faUserPlus,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";

const SignupContainer = styled.div`
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

const SignupForm = styled.div`
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

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        username,
        password,
        role,
      });
      if (response.data) {
        setError("تم إنشاء الحساب بنجاح.");
      }
    } catch (error) {
      console.error("Error signing up", error);
      setError("حدث خطأ أثناء إنشاء الحساب. تأكد من صحة البيانات.");
    }
  };

  return (
    <SignupContainer>
      <Heading>
        <h2>إنشاء حساب</h2>
      </Heading>
      <SignupForm>
        <h3>تسجيل حساب جديد</h3>
        <form onSubmit={handleSignup}>
          <FormGroup>
            <label>
              <FontAwesomeIcon icon={faAddressBook} />
              اسم الموظف باللغة العربية
            </label>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>
              <FontAwesomeIcon icon={faUser} />
              اسم المستخدم Username
            </label>
            <FormControl
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
                required
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordWrapper>
          </FormGroup>
          <FormGroup>
            <label htmlFor="role">الصلاحية</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="accountant">محاسب</option>
              <option value="inventory-manager">مسئول المخزون</option>
              <option value="full-access">Full Access</option>
            </select>
          </FormGroup>

          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">
            <FontAwesomeIcon icon={faUserPlus} />
            إنشاء حساب
          </Button>
        </form>
      </SignupForm>
    </SignupContainer>
  );
};

export default Register;
