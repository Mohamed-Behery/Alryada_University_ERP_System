import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};

  h2 {
    color: ${({ theme }) => theme.text};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  th {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.neutral};
    position: sticky;
    z-index: 1;
    font-size: 24px;
  }
`;

const TableHeader = styled.thead`
  background-color: #4a90e2;
  color: white;
`;

const TableRow = styled.tr``;

const FormContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e53935;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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

const Banks = () => {
  const [banks, setbanks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    account_number: "",
    location: "",
    opening_balance: "",
    total_incoming: "",
    total_outgoing: "",
    current_balance: "",
    responsible_person: "",
    notes: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchbanks();
  }, []);

  const fetchbanks = async () => {
    try {
      const response = await axios.get("/api/banks");
      setbanks(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await axios.put(`/api/banks/${formData.id}`, formData);
      } else {
        await axios.post("/api/banks", formData);
      }
      fetchbanks();
      closeForm();
    } catch (error) {
      console.error("Error saving bank:", error);
    }
  };

  const openForm = (bank = {}) => {
    setFormData({
      id: bank.id || "",
      name: bank.name || "",
      account_number: bank.account_number || "",
      location: bank.location || "",
      opening_balance: bank.opening_balance || "",
      total_incoming: bank.total_incoming || "",
      total_outgoing: bank.total_outgoing || "",
      current_balance: bank.current_balance || "",
      responsible_person: bank.responsible_person || "",
      notes: bank.notes || "",
    });
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setFormData({
      id: "",
      name: "",
      account_number: "",
      location: "",
      opening_balance: "",
      total_incoming: "",
      total_outgoing: "",
      current_balance: "",
      responsible_person: "",
      notes: "",
    });
    setIsFormVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/banks/${id}`);
      fetchbanks();
    } catch (error) {
      console.error("Error deleting bank:", error);
    }
  };

  return (
    <Container>
      <h2>إدارة البنوك</h2>
      <AddButton type="button" onClick={() => openForm()}>
        <FontAwesomeIcon icon={faPlus} />
        إضافة بنك
      </AddButton>
      <Table>
        <TableHeader>
          <tr>
            <th>الاسم</th>
            <th>رقم الحساب</th>
            <th>الموقع</th>
            <th>الرصيد الافتتاحي</th>
            <th>الإجمالي الوارد</th>
            <th>الإجمالي الصادر</th>
            <th>الرصيد الحالي</th>
            <th>المسؤول</th>
            <th>ملاحظات</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
        </TableHeader>
        <tbody>
          {banks.length > 0 ? (
            banks.map((bank) => (
              <TableRow key={bank.id}>
                <td>{bank.name}</td>
                <td>{bank.account_number}</td>
                <td>{bank.location}</td>
                <td>{bank.opening_balance}</td>
                <td>{bank.total_incoming}</td>
                <td>{bank.total_outgoing}</td>
                <td>{bank.current_balance}</td>
                <td>{bank.responsible_person}</td>
                <td>{bank.notes}</td>
                <td>
                  <EditButton type="button" onClick={() => openForm(bank)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </EditButton>
                </td>
                <td>
                  <DeleteButton
                    type="button"
                    onClick={() => {
                      if (window.confirm("هل تريد حذف هذا البنك؟")) {
                        handleDelete(bank.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                </td>
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan="11">لا توجد بيانات.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {isFormVisible && (
        <Overlay>
          <FormContainer onSubmit={handleFormSubmit}>
            <FormGroup>
              <label>اسم البنك:</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>رقم الحساب:</label>
              <input
                type="text"
                value={formData.account_number || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    account_number: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>الموقع:</label>
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label>الرصيد الافتتاحي:</label>
              <input
                type="number"
                value={formData.opening_balance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_balance: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>الإجمالي الوارد:</label>
              <input
                type="number"
                value={formData.total_incoming || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_incoming: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>الإجمالي الصادر:</label>
              <input
                type="number"
                value={formData.total_outgoing || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_outgoing: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>الرصيد الحالي:</label>
              <input
                type="number"
                value={formData.current_balance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    current_balance: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>المسؤول:</label>
              <input
                type="text"
                value={formData.responsible_person || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsible_person: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <label>ملاحظات:</label>
              <textarea
                value={formData.notes || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormActions>
              <SubmitButton type="submit">حفظ</SubmitButton>
              <CancelButton type="button" onClick={closeForm}>
                إلغاء
              </CancelButton>
            </FormActions>
          </FormContainer>
        </Overlay>
      )}
    </Container>
  );
};

export default Banks;
