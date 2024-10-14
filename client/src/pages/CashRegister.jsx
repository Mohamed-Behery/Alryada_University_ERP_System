import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getAllAccounts } from "./ChartOfAccounts";

const Container = styled.div`
  padding: 20px;
  max-width: 1500px;
  width: 90%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
`;

const Title = styled.h2`
  margin: 0;
`;

const SubTitle = styled.h3`
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #06538e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.neutral};
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.text};

  &:nth-child(2) {
    column-span: 2;
  }

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.neutral};
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #06538e;
    }

    &:last-child {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const Description = styled.td`
  width: 50%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Actions = styled.td`
  width: 20%;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:first-child {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.neutral};
      margin-left: 16px;
    }

    &:first-child:hover {
      background-color: #06538e;
    }

    &:nth-child(2) {
      background-color: #dc143d;
      color: ${({ theme }) => theme.neutral};
    }

    &:nth-child(2):hover {
      background-color: #b8202f;
    }
  }
`;

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
    <Container>
      <Title>الخزينة الرئيسية</Title>
      <Header>
        <SubTitle>الرصيد الحالي: {balance} جنيه</SubTitle>
      </Header>
      <Form onSubmit={handleAddOrUpdateTransaction}>
        <Input
          type="text"
          placeholder="وصف المعاملة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="المبلغ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          <option value="">نوع العملية</option>
          <option value="income">إيراد</option>
          <option value="expense">مصروف</option>
        </select>

        {/* إضافة الحسابات من شجرة الحسابات */}
        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          required
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          <option value="">اختر الحساب</option>
          {renderAccountsForCombo(accounts)}
        </select>
        <Button type="submit">
          {editIndex !== null ? "تحديث المعاملة" : "إضافة معاملة"}
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <TableHeader>التاريخ</TableHeader>
            <TableHeader>الوصف</TableHeader>
            <TableHeader>المبلغ</TableHeader>
            <TableHeader>النوع</TableHeader>
            <TableHeader>الحساب</TableHeader>
            <TableHeader>الإجراءات</TableHeader>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <Description>{transaction.description}</Description>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                {transaction.type === "income" ? "إيراد" : "مصروف"}
              </TableCell>
              <TableCell>{transaction.accountId}</TableCell>
              <Actions>
                <button onClick={() => handleEditTransaction(index)}>
                  تعديل
                </button>
                <button onClick={() => handleDeleteTransaction(index)}>
                  حذف
                </button>
              </Actions>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CashRegister;
