import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditUserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.span`
  position: absolute;
  top: 37%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  user-select: none;
`;

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    // password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, user);
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <EditUserContainer>
      <Title>تعديل المستخدم</Title>
      <EditForm onSubmit={handleSubmit}>
        <Label>اسم الموظف:</Label>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <Label>اسم المستخدم Username:</Label>
        <Input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <Label>كلمة المرور:</Label>
        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={handleChange}
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </PasswordToggle>
        </PasswordWrapper>
        <Label>الصلاحية:</Label>
        <Select name="role" value={user.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="accountant">محاسب</option>
          <option value="inventory-manager">مسئول المخزون</option>
          <option value="full-access">Full Access</option>
        </Select>
        <Button type="submit">تحديث</Button>
      </EditForm>
    </EditUserContainer>
  );
};

export default EditUser;
