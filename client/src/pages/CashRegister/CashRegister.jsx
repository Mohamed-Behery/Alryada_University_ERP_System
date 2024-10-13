import React, { useState, useEffect } from "react";
import styles from "./CashRegister.module.css";

// استيراد شجرة الحسابات
import { getAllAccounts } from "../ChartOfAccounts/ChartOfAccounts"; // تأكد من أن هذا الاستيراد متوافق مع ملف شجرة الحسابات الخاص بك

const CashRegister = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editIndex, setEditIndex] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (storedTransactions) {
      setTransactions(storedTransactions);
      calculateBalance(storedTransactions);
    }

    // استدعاء كل الحسابات من شجرة الحسابات
    const allAccounts = getAllAccounts();
    setAccounts(allAccounts);
  }, []);

  const calculateBalance = (transactions) => {
    let newBalance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        newBalance += transaction.amount;
      } else if (transaction.type === "expense") {
        newBalance -= transaction.amount;
      }
    });
    setBalance(newBalance);
  };

  const handleAddOrUpdateTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      id:
        editIndex !== null
          ? transactions[editIndex].id
          : transactions.length + 1,
      date: new Date().toLocaleDateString(),
      description,
      amount: parseFloat(amount),
      type,
      accountId: selectedAccountId,
    };

    let updatedTransactions;
    if (editIndex !== null) {
      updatedTransactions = [...transactions];
      const oldTransaction = updatedTransactions[editIndex];
      adjustBalanceOnEditOrDelete(oldTransaction, true);
      updatedTransactions[editIndex] = newTransaction;
      adjustBalanceOnEditOrDelete(newTransaction, false);
    } else {
      updatedTransactions = [...transactions, newTransaction];
      adjustBalanceOnEditOrDelete(newTransaction, false);
    }

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    resetForm();
  };

  const adjustBalanceOnEditOrDelete = (transaction, isDelete) => {
    const transactionAmount = transaction.amount;
    if (transaction.type === "income") {
      setBalance((prevBalance) =>
        isDelete
          ? prevBalance - transactionAmount
          : prevBalance + transactionAmount
      );
    } else if (transaction.type === "expense") {
      setBalance((prevBalance) =>
        isDelete
          ? prevBalance + transactionAmount
          : prevBalance - transactionAmount
      );
    }
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType("");
    setSelectedAccountId("");
    setEditIndex(null);
  };

  const handleEditTransaction = (index) => {
    const transactionToEdit = transactions[index];
    setDescription(transactionToEdit.description);
    setAmount(transactionToEdit.amount);
    setType(transactionToEdit.type);
    setSelectedAccountId(transactionToEdit.accountId);
    setEditIndex(index);
  };

  const handleDeleteTransaction = (index) => {
    const transactionToDelete = transactions[index];
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    adjustBalanceOnEditOrDelete(transactionToDelete, true);
  };

  useEffect(() => {
    // استرجاع الحسابات من localStorage
    const storedAccounts =
      JSON.parse(localStorage.getItem("chartOfAccounts")) || [];
    setAccounts(storedAccounts);
  }, []); // هذا سيعمل مرة واحدة عند تثبيت المكون

  const renderAccountsForCombo = (accounts, level = 0) => {
    return accounts.map((account) => (
      <React.Fragment key={account.id}>
        <option value={account.id}>
          {`${"--".repeat(level)} ${account.accountName}`}
        </option>
        {account.subAccounts &&
          account.subAccounts.length > 0 &&
          renderAccountsForCombo(account.subAccounts, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.container}>
      <h2>الخزينة الرئيسية</h2>
      <div className={styles.header}>
        <h3>الرصيد الحالي: {balance} جنيه</h3>
      </div>
      <form className={styles.form} onSubmit={handleAddOrUpdateTransaction}>
        <input
          className={styles.input}
          type="text"
          placeholder="وصف المعاملة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="number"
          placeholder="المبلغ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">نوع العملية</option>
          <option value="income">إيراد</option>
          <option value="expense">مصروف</option>
        </select>

        {/* إضافة الحسابات من شجرة الحسابات */}
        <select
          className={styles.input}
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          required
        >
          <option value="">اختر الحساب</option>
          {renderAccountsForCombo(accounts)}
        </select>
        <button className={styles.button} type="submit">
          {editIndex !== null ? "تعديل المعاملة" : "إضافة معاملة"}
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>البيان</th>
            <th>المبلغ</th>
            <th>النوع</th>
            <th>الحساب</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td className={styles.description}>
                  {transaction.description}
                </td>
                <td>{transaction.amount}</td>
                <td>{transaction.type === "income" ? "إيراد" : "مصروف"}</td>
                <td>{transaction.accountId}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleEditTransaction(index)}>
                    تعديل
                  </button>
                  <button onClick={() => handleDeleteTransaction(index)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                <b>لا يوجد معاملات.</b>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CashRegister;
