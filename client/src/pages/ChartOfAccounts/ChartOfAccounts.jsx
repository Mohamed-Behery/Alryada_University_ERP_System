import React from "react";
import styles from "./ChartOfAccounts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ChartOfAccounts = () => {
  const accounts = [
    {
      id: 1,
      accountNumber: "1001",
      accountName: "الأصول الثابتة",
      type: "أصول",
      balance: "500,000",
    },
    {
      id: 2,
      accountNumber: "2001",
      accountName: "الخصوم المتداولة",
      type: "خصوم",
      balance: "200,000",
    },
    {
      id: 3,
      accountNumber: "3001",
      accountName: "حقوق الملكية",
      type: "حقوق",
      balance: "300,000",
    },
    {
      id: 4,
      accountNumber: "4001",
      accountName: "إيرادات و مصروفات",
      type: "إيرادات ومصروفات",
      balance: "100,000",
    },
  ];

  return (
    <div className={styles.ChartOfAccounts}>
      <h2>شجرة الحسابات</h2>
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
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.accountNumber}</td>
              <td>{account.accountName}</td>
              <td>{account.type}</td>
              <td>{account.balance}</td>
              <td>
                <button className={styles.editBtn}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button className={styles.deleteBtn}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartOfAccounts;
