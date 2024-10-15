// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faTrashAlt,
//   faPlus,
//   faChevronDown,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// const ChartOfAccountsContainer = styled.div``;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHeader = styled.th`
//   border: 1px solid #ddd;
//   padding: 10px;
//   text-align: center;
//   font-weight: bold;
//   background-color: #4a5ecd;
//   color: #fff;
//   font-size: 24px;
//   position: sticky;
// `;

// const TableCell = styled.td`
//   border: 1px solid ${(theme) => theme.border};
//   padding: 10px;
//   text-align: center;
//   font-size: 20px;
//   position: relative;

//   background-color: ${(props) => {
//     switch (props.level) {
//       case 0:
//         return "#dddede";
//       case 1:
//         return "#ededed";
//       case 2:
//         return "#f4f6f8";
//       default:
//         return "#fff";
//     }
//   }};
// `;

// const SubAccountsToggle = styled.span`
//   position: absolute;
//   top: 50%;
//   right: 24px;
//   transform: translateY(-50%);
//   cursor: pointer;
// `;

// const EditButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 5px;
//   color: #007bff;

//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const DeleteButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 5px;
//   color: #dc3545;

//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const AddButton = styled.button`
//   margin-bottom: 16px;
//   margin-right: 16px;
//   padding: 10px 20px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: bold;
//   border-radius: 4px;

//   svg {
//     margin-left: 8px;
//     position: relative;
//     top: 2px;
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const FormContainer = styled.div`
//   background-color: white;
//   padding: 30px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;

//   label {
//     display: block;
//     margin-bottom: 5px;
//     font-size: 14px;
//   }

//   input {
//     width: 100%;
//     padding: 8px;
//     font-size: 14px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }
// `;

// const FormActions = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const SubmitButton = styled.button`
//   padding: 10px 20px;
//   background-color: #4a5ecd;
//   color: white;
//   border: none;
//   cursor: pointer;
//   border-radius: 4px;

//   &:hover {
//     background-color: #3a4ea1;
//   }
// `;

// const CancelButton = styled.button`
//   padding: 10px 20px;
//   background-color: #dc3545;
//   color: white;
//   border: none;
//   cursor: pointer;
//   border-radius: 4px;

//   &:hover {
//     background-color: #a71d2a;
//   }
// `;

// const ChartOfAccounts = () => {
//   const [accounts, setAccounts] = useState(() => {
//     const storedAccounts = localStorage.getItem("chartOfAccounts");
//     return storedAccounts ? JSON.parse(storedAccounts) : [];
//   });

//   const [openAccounts, setOpenAccounts] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//    account_code: "",
//    account_name: "",
//     type: "",
//     opening_balance: "",
//     current_balance: "",
//     parentId: null,
//   });

//   useEffect(() => {
//     localStorage.setItem("chartOfAccounts", JSON.stringify(accounts));
//   }, [accounts]);

//   const toggleAccount = (accountId) => {
//     if (openAccounts.includes(accountId)) {
//       setOpenAccounts(openAccounts.filter((id) => id !== accountId));
//     } else {
//       setOpenAccounts([...openAccounts, accountId]);
//     }
//   };

//   const openForm = (account = null) => {
//     if (account) {
//       setFormData({
//         id: account.id,
//        account_code: account.account_code,
//        account_name: account.account_name,
//         type: account.account_type,
//         opening_balance: account.opening_balance,
//         current_balance: account.current_balance,
//         parentId: account.parentId || null,
//       });
//     } else {
//       setFormData({
//         id: null,
//        account_code: "",
//        account_name: "",
//         type: "",
//         opening_balance: "",
//         current_balance: "",
//         parentId: null,
//       });
//     }
//     setIsFormVisible(true);
//   };

//   const closeForm = () => {
//     setIsFormVisible(false);
//     setFormData({
//       id: null,
//      account_code: "",
//      account_name: "",
//       type: "",
//       opening_balance: "",
//       current_balance: "",
//       parentId: null,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedAccount = {
//      account_code: formData.account_code,
//      account_name: formData.account_name,
//       type: formData.account_type,
//       opening_balance: formData.opening_balance,
//       current_balance: formData.current_balance,
//     };

//     if (formData.id) {
//       setAccounts((prevAccounts) =>
//         updateAccount(prevAccounts, formData.id, updatedAccount)
//       );
//     } else {
//       const newAccount = {
//         id: Date.now(),
//        account_code: formData.account_code,
//        account_name: formData.account_name,
//         type: formData.account_type,
//         opening_balance: formData.opening_balance,
//         current_balance: formData.opening_balance,
//         subAccounts: [],
//       };

//       if (formData.parentId) {
//         setAccounts((prevAccounts) => {
//           const updatedAccounts = addSubAccount(
//             prevAccounts,
//             parseInt(formData.parentId),
//             newAccount
//           );
//           return updatedAccounts;
//         });
//       } else {
//         setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
//       }
//     }

//     closeForm();
//   };

//   const addSubAccount = (accounts, parentId, newAccount) => {
//     return accounts.map((account) => {
//       if (account.id === parentId) {
//         return {
//           ...account,
//           subAccounts: [...(account.subAccounts || []), newAccount],
//         };
//       }

//       if (account.subAccounts && account.subAccounts.length > 0) {
//         return {
//           ...account,
//           subAccounts: addSubAccount(account.subAccounts, parentId, newAccount),
//         };
//       }

//       return account;
//     });
//   };

//   const updateAccount = (accounts, id, updatedAccount) => {
//     return accounts.map((account) => {
//       if (account.id === id) {
//         return { ...account, ...updatedAccount };
//       }
//       if (account.subAccounts) {
//         return {
//           ...account,
//           subAccounts: updateAccount(account.subAccounts, id, updatedAccount),
//         };
//       }
//       return account;
//     });
//   };

//   const deleteAccount = (accountId) => {
//     setAccounts((prevAccounts) => removeAccount(prevAccounts, accountId));
//   };

//   const removeAccount = (accounts, accountId) => {
//     return accounts
//       .map((account) => {
//         if (account.subAccounts) {
//           return {
//             ...account,
//             subAccounts: removeAccount(account.subAccounts, accountId),
//           };
//         }
//         return account;
//       })
//       .filter((account) => account.id !== accountId);
//   };

//   const renderSubAccounts = (subAccounts, level) => {
//     return subAccounts.map((subAccount) => (
//       <React.Fragment key={subAccount.id}>
//         <option value={subAccount.id}>
//           {`${"--".repeat(level)} ${subAccount.account_name}`}
//         </option>
//         {subAccount.subAccounts &&
//           renderSubAccounts(subAccount.subAccounts, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   const renderAccountRow = (account, level = 0) => {
//     const isOpen = openAccounts.includes(account.id);

//     return (
//       <React.Fragment key={account.id}>
//         <tr>
//           <TableCell level={level}>{account.account_code}</TableCell>
//           <TableCell level={level}>
//             {account.subAccounts && (
//               <SubAccountsToggle onClick={() => toggleAccount(account.id)}>
//                 {isOpen ? (
//                   <FontAwesomeIcon icon={faChevronDown} />
//                 ) : (
//                   <FontAwesomeIcon icon={faChevronRight} />
//                 )}
//               </SubAccountsToggle>
//             )}
//             {account.account_name}
//           </TableCell>
//           <TableCell level={level}>{account.account_type}</TableCell>
//           <TableCell level={level}>{account.opening_balance}</TableCell>
//           <TableCell level={level}>{account.current_balance}</TableCell>
//           <TableCell level={level}>
//             <EditButton onClick={() => openForm(account)}>
//               <FontAwesomeIcon icon={faEdit} />
//             </EditButton>
//           </TableCell>
//           <TableCell level={level}>
//             <DeleteButton onClick={() => deleteAccount(account.id)}>
//               <FontAwesomeIcon icon={faTrashAlt} />
//             </DeleteButton>
//           </TableCell>
//         </tr>
//         {isOpen &&
//           account.subAccounts &&
//           account.subAccounts.map((subAccount) =>
//             renderAccountRow(subAccount, level + 1)
//           )}
//       </React.Fragment>
//     );
//   };

//   return (
//     <ChartOfAccountsContainer>
//       <h2>شجرة الحسابات</h2>
//       <AddButton onClick={() => openForm()}>
//         <FontAwesomeIcon icon={faPlus} /> إضافة حساب
//       </AddButton>
//       <Table>
//         <thead>
//           <tr>
//             <TableHeader>رقم الحساب</TableHeader>
//             <TableHeader>اسم الحساب</TableHeader>
//             <TableHeader>نوع الحساب</TableHeader>
//             <TableHeader>الرصيد الإفتتاحي</TableHeader>
//             <TableHeader>الرصيد الحالي</TableHeader>
//             <TableHeader>تعديل</TableHeader>
//             <TableHeader>حذف</TableHeader>
//           </tr>
//         </thead>
//         <tbody>{accounts.map((account) => renderAccountRow(account))}</tbody>
//       </Table>

//       {isFormVisible && (
//         <Overlay>
//           <FormContainer>
//             <h3>{formData.id ? "تعديل الحساب" : "إضافة حساب جديد"}</h3>
//             <form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <label htmlFor="account_code">رقم الحساب:</label>
//                 <input
//                   id="account_code"
//                   type="text"
//                   value={formData.account_code}
//                   onChange={(e) =>
//                     setFormData({ ...formData,account_code: e.target.value })
//                   }
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="account_name">اسم الحساب:</label>
//                 <input
//                   id="account_name"
//                   type="text"
//                   value={formData.account_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData,account_name: e.target.value })
//                   }
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="type">نوع الحساب:</label>
//                 <input
//                   id="type"
//                   type="text"
//                   value={formData.account_type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, type: e.target.value })
//                   }
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="opening_balance">الرصيد الإفتتاحي:</label>
//                 <input
//                   id="opening_balance"
//                   type="number"
//                   value={formData.opening_balance}
//                   onChange={(e) =>
//                     setFormData({ ...formData, opening_balance: e.target.value })
//                   }
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="current_balance">الرصيد الحالي:</label>
//                 <input
//                   id="current_balance"
//                   type="number"
//                   value={formData.current_balance}
//                   onChange={(e) =>
//                     setFormData({ ...formData, current_balance: e.target.value })
//                   }
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="parentId">الحساب الأب:</label>
//                 <select
//                   id="parentId"
//                   value={formData.parentId || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       parentId: e.target.value === "" ? null : e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">حساب رئيسي</option>
//                   {accounts.map((account) => (
//                     <React.Fragment key={account.id}>
//                       <option value={account.id}>{account.account_name}</option>
//                       {renderSubAccounts(account.subAccounts, 1)}
//                     </React.Fragment>
//                   ))}
//                 </select>
//               </FormGroup>

//               <FormActions>
//                 <SubmitButton type="submit">
//                   {formData.id ? "تعديل" : "إضافة"}
//                 </SubmitButton>
//                 <CancelButton type="button" onClick={closeForm}>
//                   إلغاء
//                 </CancelButton>
//               </FormActions>
//             </form>
//           </FormContainer>
//         </Overlay>
//       )}
//     </ChartOfAccountsContainer>
//   );
// };

// export default ChartOfAccounts;

// export const getAllAccounts = () => {
//   const storedAccounts =
//     JSON.parse(localStorage.getItem("chartOfAccounts")) || [];

//   const flattenAccounts = (accounts, level = 0) => {
//     return accounts.reduce((acc, account) => {
//       const accountWithLevel = { ...account, level };

//       return acc.concat(
//         accountWithLevel,
//         flattenAccounts(account.subAccounts || [], level + 1)
//       );
//     }, []);
//   };

//   return flattenAccounts(storedAccounts);
// };

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
import axios from "axios";

const ChartOfAccountsContainer = styled.div`
  h2 {
    color: ${({ theme }) => theme.text};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
  font-size: 24px;
  position: sticky;
`;

const TableCell = styled.td`
  border: 1px solid ${({ theme }) => theme.border};
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
  background-color: ${({ theme }) => theme.bg};
  padding: 30px;
  border-radius: 8px;
  width: 400px;

  h3 {
    color: ${({ theme }) => theme.text};
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
  }

  input:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #dc143d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #a71d2a;
  }
`;

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [openAccounts, setOpenAccounts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    account_code: "",
    account_name: "",
    type: "",
    opening_balance: "",
    current_balance: "",
    parentId: null,
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const toggleAccount = (accountId) => {
    setOpenAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const openForm = (account = null) => {
    if (account) {
      setFormData({
        id: account.id,
        account_code: account.account_code,
        account_name: account.account_name,
        account_type: account.account_type,
        opening_balance: account.opening_balance,
        current_balance: account.current_balance,
        parentId: account.parentId || null,
      });
    } else {
      setFormData({
        id: null,
        account_code: "",
        account_name: "",
        account_type: "",
        opening_balance: "",
        current_balance: "",
        parent_id: null,
      });
    }
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setFormData({
      id: null,
      account_code: "",
      account_name: "",
      account_type: "",
      opening_balance: "",
      current_balance: "",
      parentId: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = {
      account_code: formData.account_code,
      account_name: formData.account_name,
      account_type: formData.account_type,
      opening_balance: formData.opening_balance,
      current_balance: formData.current_balance,
      parentId: formData.parentId,
    };

    try {
      if (formData.id) {
        await axios.put(
          `http://localhost:8000/api/accounts/${formData.id}`,
          accountData
        );
      } else {
        await axios.post("http://localhost:8000/api/accounts", accountData);
      }

      closeForm();
      // Refresh accounts after adding/updating
      const response = await axios.get("http://localhost:8000/api/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error saving account:", error);
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${accountId}`);
      // Refresh accounts after deletion
      const response = await axios.get("http://localhost:8000/api/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const renderAccountRow = (account, level = 0) => {
    const isOpen = openAccounts.includes(account.id);

    return (
      <React.Fragment key={account.id}>
        <tr>
          <TableCell level={level}>{account.account_code}</TableCell>
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
            {account.account_name}
          </TableCell>
          <TableCell level={level}>{account.account_type}</TableCell>
          <TableCell level={level}>{account.opening_balance}</TableCell>
          <TableCell level={level}>{account.current_balance}</TableCell>
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
            <h3>{formData.id ? "تعديل حساب" : "إضافة حساب"}</h3>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>رقم الحساب:</label>
                <input
                  type="text"
                  value={formData.account_code}
                  onChange={(e) =>
                    setFormData({ ...formData, account_code: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>اسم الحساب:</label>
                <input
                  type="text"
                  value={formData.account_name}
                  onChange={(e) =>
                    setFormData({ ...formData, account_name: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>نوع الحساب:</label>
                <input
                  type="text"
                  value={formData.account_type}
                  onChange={(e) =>
                    setFormData({ ...formData, account_type: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>الرصيد الإفتتاحي:</label>
                <input
                  type="number"
                  value={formData.opening_balance}
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
                <label>الرصيد الحالي:</label>
                <input
                  type="number"
                  value={formData.current_balance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      current_balance: e.target.value,
                    })
                  }
                  required
                />
              </FormGroup>
              <FormActions>
                <SubmitButton type="submit">حفظ</SubmitButton>
                <CancelButton onClick={closeForm}>إلغاء</CancelButton>
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
