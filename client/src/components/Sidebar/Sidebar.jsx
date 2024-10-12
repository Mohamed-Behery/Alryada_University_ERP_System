import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
// import LogoImg from "../../images/WhatsApp Image 2024-10-11 at 01.25.11_4fc6bba8.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faCreditCard,
  faArchive,
  faCashRegister,
  faChartBar,
  faCogs,
  faUserGraduate,
  faShoppingCart,
  faWarehouse,
  faTruck,
  faFileAlt,
  faSignOutAlt,
  faCaretDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTreasuryOpen, setTreasuryOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleTreasuryMenu = () => {
    setTreasuryOpen(!isTreasuryOpen);
  };

  const toggleInventoryMenu = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.collapsed}`}
    >
      <div className={styles.logoContainer}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {isSidebarOpen && (
          // <img className={styles.logo} src={LogoImg} alt="Logo" />
          <h1 className={styles.logo}>AL Ryada University</h1>
        )}
      </div>

      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> {isSidebarOpen && "الرئيسية"}
          </Link>
        </li>
        <li>
          <Link to="/chart-of-accounts">
            <FontAwesomeIcon icon={faBookOpen} />{" "}
            {isSidebarOpen && "شجرة الحسابات"}
          </Link>
        </li>
        <li onClick={toggleTreasuryMenu}>
          <FontAwesomeIcon icon={faCashRegister} />{" "}
          {isSidebarOpen && "الخزينة والبنوك"}{" "}
          {isSidebarOpen && <FontAwesomeIcon icon={faCaretDown} />}
        </li>
        {isSidebarOpen && isTreasuryOpen && (
          <ul className={styles.subMenu}>
            <li>
              <Link to="/bank-accounts">
                <FontAwesomeIcon icon={faCreditCard} /> حسابات البنوك
              </Link>
            </li>
            <li>
              <Link to="/cash-register">
                <FontAwesomeIcon icon={faArchive} /> سجلات المعاملات
              </Link>
            </li>
          </ul>
        )}
        <li>
          <FontAwesomeIcon icon={faChartBar} /> {isSidebarOpen && "الإيرادات"}
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} /> {isSidebarOpen && "المصروفات"}
        </li>
        <li>
          <FontAwesomeIcon icon={faUserGraduate} /> {isSidebarOpen && "الطلاب"}
        </li>
        <li>
          <FontAwesomeIcon icon={faShoppingCart} />{" "}
          {isSidebarOpen && "المشتريات"}
        </li>
        <li onClick={toggleInventoryMenu}>
          <FontAwesomeIcon icon={faWarehouse} /> {isSidebarOpen && "المخزون"}{" "}
          {isSidebarOpen && <FontAwesomeIcon icon={faCaretDown} />}
        </li>
        {isSidebarOpen && isInventoryOpen && (
          <ul className={styles.subMenu}>
            <li>أصناف المخزون</li>
            <li>سجلات المخزون</li>
          </ul>
        )}
        <li>
          <FontAwesomeIcon icon={faTruck} /> {isSidebarOpen && "الموردين"}
        </li>
        <li>
          <FontAwesomeIcon icon={faTruck} /> {isSidebarOpen && "المقاولين"}
        </li>
        <li>
          <FontAwesomeIcon icon={faFileAlt} /> {isSidebarOpen && "التقارير"}
        </li>
        <li>
          <FontAwesomeIcon icon={faCogs} /> {isSidebarOpen && "الإعدادات"}
        </li>
        {user && (
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isSidebarOpen && "تسجيل الخروج"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
