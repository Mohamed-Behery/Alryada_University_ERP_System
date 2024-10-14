import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ChartOfAccountsContainer = styled.div``;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #4a5ecd;
  color: #fff;
  font-size: 24px;
  position: sticky;
`;

const TableCell = styled.td`
  border: 1px solid ${(theme) => theme.border};
  padding: 10px;
  text-align: center;
  font-size: 20px;
  position: relative;

  background-color: ${(props) => {
    switch (props.level) {
      case 0:
        return "#dddede";
      case 1:
        return "#ededed";
      case 2:
        return "#f4f6f8";
      default:
        return "#fff";
    }
  }};
`;

const SubAccountsToggle = styled.span`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #007bff;

  &:hover {
    opacity: 0.7;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #dc3545;

  &:hover {
    opacity: 0.7;
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
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4a5ecd;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #3a4ea1;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #a71d2a;
  }
`;

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("chartOfAccounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

  const [openAccounts, setOpenAccounts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    accountNumber: "",
    accountName: "",
    type: "",
    openingBalance: "",
    currentBalance: "",
    parentId: null,
  });

  useEffect(() => {
    localStorage.setItem("chartOfAccounts", JSON.stringify(accounts));
  }, [accounts]);

  const toggleAccount = (accountId) => {
    if (openAccounts.includes(accountId)) {
      setOpenAccounts(openAccounts.filter((id) => id !== accountId));
    } else {
      setOpenAccounts([...openAccounts, accountId]);
    }
  };

  const openForm = (account = null) => {
    if (account) {
      setFormData({
        id: account.id,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        type: account.type,
        openingBalance: account.openingBalance,
        currentBalance: account.currentBalance,
        parentId: account.parentId || null,
      });
    } else {
      setFormData({
        id: null,
        accountNumber: "",
        accountName: "",
        type: "",
        openingBalance: "",
        currentBalance: "",
        parentId: null,
      });
    }
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setFormData({
      id: null,
      accountNumber: "",
      accountName: "",
      type: "",
      openingBalance: "",
      currentBalance: "",
      parentId: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAccount = {
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      type: formData.type,
      openingBalance: formData.openingBalance,
      currentBalance: formData.currentBalance,
    };

    if (formData.id) {
      setAccounts((prevAccounts) =>
        updateAccount(prevAccounts, formData.id, updatedAccount)
      );
    } else {
      const newAccount = {
        id: Date.now(),
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        type: formData.type,
        openingBalance: formData.openingBalance,
        currentBalance: formData.openingBalance,
        subAccounts: [],
      };

      if (formData.parentId) {
        setAccounts((prevAccounts) => {
          const updatedAccounts = addSubAccount(
            prevAccounts,
            parseInt(formData.parentId),
            newAccount
          );
          return updatedAccounts;
        });
      } else {
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      }
    }

    closeForm();
  };

  const addSubAccount = (accounts, parentId, newAccount) => {
    return accounts.map((account) => {
      if (account.id === parentId) {
        return {
          ...account,
          subAccounts: [...(account.subAccounts || []), newAccount],
        };
      }

      if (account.subAccounts && account.subAccounts.length > 0) {
        return {
          ...account,
          subAccounts: addSubAccount(account.subAccounts, parentId, newAccount),
        };
      }

      return account;
    });
  };

  const updateAccount = (accounts, id, updatedAccount) => {
    return accounts.map((account) => {
      if (account.id === id) {
        return { ...account, ...updatedAccount };
      }
      if (account.subAccounts) {
        return {
          ...account,
          subAccounts: updateAccount(account.subAccounts, id, updatedAccount),
        };
      }
      return account;
    });
  };

  const deleteAccount = (accountId) => {
    setAccounts((prevAccounts) => removeAccount(prevAccounts, accountId));
  };

  const removeAccount = (accounts, accountId) => {
    return accounts
      .map((account) => {
        if (account.subAccounts) {
          return {
            ...account,
            subAccounts: removeAccount(account.subAccounts, accountId),
          };
        }
        return account;
      })
      .filter((account) => account.id !== accountId);
  };

  const renderSubAccounts = (subAccounts, level) => {
    return subAccounts.map((subAccount) => (
      <React.Fragment key={subAccount.id}>
        <option value={subAccount.id}>
          {`${"--".repeat(level)} ${subAccount.accountName}`}
        </option>
        {subAccount.subAccounts &&
          renderSubAccounts(subAccount.subAccounts, level + 1)}
      </React.Fragment>
    ));
  };

  const renderAccountRow = (account, level = 0) => {
    const isOpen = openAccounts.includes(account.id);

    return (
      <React.Fragment key={account.id}>
        <tr>
          <TableCell level={level}>{account.accountNumber}</TableCell>
          <TableCell level={level}>
            {account.subAccounts && (
              <SubAccountsToggle onClick={() => toggleAccount(account.id)}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </SubAccountsToggle>
            )}
            {account.accountName}
          </TableCell>
          <TableCell level={level}>{account.type}</TableCell>
          <TableCell level={level}>{account.openingBalance}</TableCell>
          <TableCell level={level}>{account.currentBalance}</TableCell>
          <TableCell level={level}>
            <EditButton onClick={() => openForm(account)}>
              <FontAwesomeIcon icon={faEdit} />
            </EditButton>
          </TableCell>
          <TableCell level={level}>
            <DeleteButton onClick={() => deleteAccount(account.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </DeleteButton>
          </TableCell>
        </tr>
        {isOpen &&
          account.subAccounts &&
          account.subAccounts.map((subAccount) =>
            renderAccountRow(subAccount, level + 1)
          )}
      </React.Fragment>
    );
  };

  return (
    <ChartOfAccountsContainer>
      <h2>شجرة الحسابات</h2>
      <AddButton onClick={() => openForm()}>
        <FontAwesomeIcon icon={faPlus} /> إضافة حساب
      </AddButton>
      <Table>
        <thead>
          <tr>
            <TableHeader>رقم الحساب</TableHeader>
            <TableHeader>اسم الحساب</TableHeader>
            <TableHeader>نوع الحساب</TableHeader>
            <TableHeader>الرصيد الإفتتاحي</TableHeader>
            <TableHeader>الرصيد الحالي</TableHeader>
            <TableHeader>تعديل</TableHeader>
            <TableHeader>حذف</TableHeader>
          </tr>
        </thead>
        <tbody>{accounts.map((account) => renderAccountRow(account))}</tbody>
      </Table>

      {isFormVisible && (
        <Overlay>
          <FormContainer>
            <h3>{formData.id ? "تعديل الحساب" : "إضافة حساب جديد"}</h3>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="accountNumber">رقم الحساب:</label>
                <input
                  id="accountNumber"
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="accountName">اسم الحساب:</label>
                <input
                  id="accountName"
                  type="text"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="type">نوع الحساب:</label>
                <input
                  id="type"
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="openingBalance">الرصيد الإفتتاحي:</label>
                <input
                  id="openingBalance"
                  type="number"
                  value={formData.openingBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, openingBalance: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="currentBalance">الرصيد الحالي:</label>
                <input
                  id="currentBalance"
                  type="number"
                  value={formData.currentBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, currentBalance: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="parentId">الحساب الأب:</label>
                <select
                  id="parentId"
                  value={formData.parentId || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parentId: e.target.value === "" ? null : e.target.value,
                    })
                  }
                >
                  <option value="">حساب رئيسي</option>
                  {accounts.map((account) => (
                    <React.Fragment key={account.id}>
                      <option value={account.id}>{account.accountName}</option>
                      {renderSubAccounts(account.subAccounts, 1)}
                    </React.Fragment>
                  ))}
                </select>
              </FormGroup>

              <FormActions>
                <SubmitButton type="submit">
                  {formData.id ? "تعديل" : "إضافة"}
                </SubmitButton>
                <CancelButton type="button" onClick={closeForm}>
                  إلغاء
                </CancelButton>
              </FormActions>
            </form>
          </FormContainer>
        </Overlay>
      )}
    </ChartOfAccountsContainer>
  );
};

export default ChartOfAccounts;

export const getAllAccounts = () => {
  const storedAccounts =
    JSON.parse(localStorage.getItem("chartOfAccounts")) || [];

  const flattenAccounts = (accounts, level = 0) => {
    return accounts.reduce((acc, account) => {
      const accountWithLevel = { ...account, level };

      return acc.concat(
        accountWithLevel,
        flattenAccounts(account.subAccounts || [], level + 1)
      );
    }, []);
  };

  return flattenAccounts(storedAccounts);
};
