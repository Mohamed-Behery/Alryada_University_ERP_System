import React, { useState } from "react";
import styles from "./ChartOfAccounts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountNumber: "1001",
      accountName: "الأصول الثابتة",
      type: "أصول",
      balance: "500,000",
      subAccounts: [
        {
          id: 11,
          accountNumber: "1010",
          accountName: "المباني",
          type: "أصول",
          balance: "200,000",
          subAccounts: [
            {
              id: 111,
              accountNumber: "1011",
              accountName: "المباني التجارية",
              type: "أصول",
              balance: "100,000",
            },
          ],
        },
        {
          id: 12,
          accountNumber: "1020",
          accountName: "المركبات",
          type: "أصول",
          balance: "100,000",
        },
      ],
    },
    {
      id: 2,
      accountNumber: "2001",
      accountName: "الخصوم المتداولة",
      type: "خصوم",
      balance: "200,000",
    },
  ]);

  const [openAccounts, setOpenAccounts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  // const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    accountNumber: "",
    accountName: "",
    type: "",
    balance: "",
    parentId: null,
  });

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
        balance: account.balance,
        parentId: null,
      });
    } else {
      setFormData({
        id: null,
        accountNumber: "",
        accountName: "",
        type: "",
        balance: "",
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
      balance: "",
      parentId: null,
    });
  };

  // إضافة حساب جديد أو تعديل حساب موجود
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // تعديل الحساب الحالي
      setAccounts((prevAccounts) =>
        updateAccount(prevAccounts, formData.id, formData)
      );
    } else {
      // إضافة حساب جديد
      const newAccount = {
        id: Date.now(),
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        type: formData.type,
        balance: formData.balance,
        subAccounts: [],
      };

      if (formData.parentId) {
        setAccounts((prevAccounts) =>
          addSubAccount(prevAccounts, formData.parentId, newAccount)
        );
      } else {
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      }
    }

    closeForm();
  };

  // تحديث الحساب بناءً على ID
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

  // إضافة حساب فرعي
  const addSubAccount = (accounts, parentId, newAccount) => {
    return accounts.map((account) => {
      if (account.id === parentId) {
        return {
          ...account,
          subAccounts: [...account.subAccounts, newAccount],
        };
      }
      if (account.subAccounts) {
        return {
          ...account,
          subAccounts: addSubAccount(account.subAccounts, parentId, newAccount),
        };
      }
      return account;
    });
  };

  // حذف الحساب
  const deleteAccount = (accountId) => {
    setAccounts((prevAccounts) => removeAccount(prevAccounts, accountId));
  };

  // إزالة الحساب بناءً على ID
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

  const renderAccountRow = (account, level = 0) => {
    const isOpen = openAccounts.includes(account.id);

    return (
      <React.Fragment key={account.id}>
        <tr className={styles[`level${level}`]}>
          <td>{account.accountNumber}</td>
          <td>
            {account.subAccounts && (
              <span
                className={styles.arrow}
                onClick={() => toggleAccount(account.id)}
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </span>
            )}
            {account.accountName}
          </td>
          <td>{account.type}</td>
          <td>{account.balance}</td>
          <td>
            <button
              className={styles.editBtn}
              onClick={() => openForm(account)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </td>
          <td>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteAccount(account.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
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
    <div className={styles.ChartOfAccounts}>
      <h2>شجرة الحسابات</h2>
      <button className={styles.addBtn} onClick={() => openForm()}>
        <FontAwesomeIcon icon={faPlus} /> إضافة حساب
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>رقم الحساب</th>
            <th>اسم الحساب</th>
            <th>نوع الحساب</th>
            <th>الرصيد</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>{accounts.map((account) => renderAccountRow(account))}</tbody>
      </table>

      {isFormVisible && (
        <div className={styles.overlay}>
          <div className={styles.formContainer}>
            <h3>{formData.id ? "تعديل الحساب" : "إضافة حساب جديد"}</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>رقم الحساب</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>اسم الحساب</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>نوع الحساب</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>الرصيد</label>
                <input
                  type="text"
                  value={formData.balance}
                  onChange={(e) =>
                    setFormData({ ...formData, balance: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>الحساب الرئيسي</label>
                <select
                  value={formData.parentId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, parentId: e.target.value })
                  }
                >
                  <option value="">حساب رئيسي</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="submit">{formData.id ? "تعديل" : "إضافة"}</button>
                <button type="button" onClick={closeForm}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartOfAccounts;
