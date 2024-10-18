import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
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

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #0061ab;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #dc143d;

  &:hover {
    opacity: 0.8;
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
        إضافة مستخدم
      </AddButton>

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
                  <EditButton onClick={() => handleEditUser(user.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton
                    onClick={() => {
                      if (window.confirm("هل تريد حذف هذا المستخدم؟")) {
                        handleDeleteUser(user.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </DeleteButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">لا توجد بيانات.</td>
            </tr>
          )}
        </tbody>
      </UsersTable>
    </UsersContainer>
  );
};

export default Users;
