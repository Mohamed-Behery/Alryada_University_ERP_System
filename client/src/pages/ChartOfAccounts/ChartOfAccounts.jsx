import React, { useState, useEffect } from "react";
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
  // يتم استرجاع البيانات المخزنة في localStorage عند تحميل المكون لأول مرة
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("chartOfAccounts");
    return storedAccounts ? JSON.parse(storedAccounts) : []; // إذا لم تكن البيانات موجودة، يتم تعيين مصفوفة فارغة
  });

  const [openAccounts, setOpenAccounts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    accountNumber: "",
    accountName: "",
    type: "",
    balance: "",
    parentId: null,
  });

  // تحديث البيانات المخزنة في localStorage عند تغيير الحسابات
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
        balance: account.balance,
        parentId: account.parentId || null,
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
        subAccounts: [], // تأكد من وجود هذا الحقل
      };

      if (formData.parentId) {
        // إضافة الحساب كحساب فرعي
        setAccounts((prevAccounts) => {
          const updatedAccounts = addSubAccount(
            prevAccounts,
            formData.parentId,
            newAccount
          );
          return updatedAccounts; // أعد القائمة المحدثة فقط
        });
      } else {
        // إضافة الحساب كحساب رئيسي
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      }
    }

    closeForm();
  };

  // دالة لإضافة الحساب الفرعي إلى الحساب الرئيسي
  const addSubAccount = (accounts, parentId, newAccount) => {
    return accounts.map((account) => {
      if (account.id === parentId) {
        return {
          ...account,
          subAccounts: [...(account.subAccounts || []), newAccount], // إضافة الحساب الجديد إلى الحسابات الفرعية
        };
      }

      if (account.subAccounts && account.subAccounts.length > 0) {
        return {
          ...account,
          subAccounts: addSubAccount(account.subAccounts, parentId, newAccount), // استدعاء الدالة بشكل متداخل لإضافة الحساب إلى الحسابات الفرعية
        };
      }

      return account; // حساب بدون حسابات فرعية
    });
  };

  // تحديث حساب بناءً على ID
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

  // حذف حساب
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

  // دالة لعرض الحسابات الفرعية بشكل متداخل
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
        <tr className={styles[`level${level}`]}>
          <td>{account.accountNumber}</td>
          <td className={styles.accountName}>
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
        <tbody>
          {accounts && accounts.length > 0 ? (
            accounts.map((account) => renderAccountRow(account))
          ) : (
            <tr>
              <td colSpan="6" className={styles.emptyMsg}>
                لا توجد حسابات حاليًا
              </td>
            </tr>
          )}
        </tbody>
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>الحساب الرئيسي</label>
                <select
                  value={formData.parentId || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parentId: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                >
                  <option value="">حساب رئيسي</option>
                  {accounts.map((account) => (
                    <React.Fragment key={account.id}>
                      <option value={account.id}>
                        {`${"--".repeat(account.level)} ${account.accountName}`}
                      </option>
                      {account.subAccounts &&
                        renderSubAccounts(account.subAccounts, 1)}
                    </React.Fragment>
                  ))}
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  {formData.id ? "تعديل" : "إضافة"}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={closeForm}
                >
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

export const getAllAccounts = () => {
  const storedAccounts =
    JSON.parse(localStorage.getItem("chartOfAccounts")) || [];

  // دالة لاسترجاع الحسابات الفرعية أيضًا مع تحديد المستوى (Level)
  const flattenAccounts = (accounts, level = 0) => {
    return accounts.reduce((acc, account) => {
      // نحدد مستوى الحساب
      const accountWithLevel = { ...account, level };

      // نقوم بجمع الحساب مع الحسابات الفرعية مع زيادة المستوى لكل فرع
      return acc.concat(
        accountWithLevel,
        flattenAccounts(account.subAccounts || [], level + 1)
      );
    }, []);
  };

  return flattenAccounts(storedAccounts);
};
