import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};

  h2 {
    color: ${({ theme }) => theme.text};
  }
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  th {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.neutral};
  }
`;

const AddButton = styled.button`
  margin-bottom: 16px;
  margin-right: 16px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;

  svg {
    margin-left: 8px;
    position: relative;
    top: 2px;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.danger ? "#dc3545" : "#28a745")};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#218838")};
  }
`;

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateNewUser = () => {
    navigate("/register");
  };

  // حذف المستخدم
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/users/edit/${id}`);
  };

  return (
    <UsersContainer>
      <h2>مستخدمين النظام</h2>

      <AddButton onClick={handleCreateNewUser}>
        <FontAwesomeIcon icon={faPlus} />
        إنشاء حساب جديد
      </AddButton>

      {/* عرض المستخدمين في جدول */}
      <UsersTable>
        <thead>
          <tr>
            <th>الرقم التعريفي</th>
            <th>الاسم</th>
            <th>البريد الالكتروني</th>
            <th>الصلاحية</th>
            <th>التعديل</th>
            <th>الحذف</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <ActionButton onClick={() => handleEditUser(user.id)}>
                    تعديل
                  </ActionButton>
                </td>
                <td>
                  <ActionButton
                    danger
                    onClick={() => {
                      if (window.confirm("هل تريد حذف هذا المستخدم؟")) {
                        handleDeleteUser(user.id);
                      }
                    }}
                  >
                    حذف
                  </ActionButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">لا توجد بيانات مستخدمين.</td>
            </tr>
          )}
        </tbody>
      </UsersTable>
    </UsersContainer>
  );
};

export default Users;
