import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: ${(props) => (props.isSidebarOpen ? "300px" : "80px")};
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSidebarOpen ? "flex-start" : "center")};
  transition: all 0.3s ease;
  overflow-y: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.isSidebarOpen ? "space-between" : "center"};
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Logo = styled.h1`
  font-size: 26px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.text};
  display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
`;

const SidebarList = styled.ul`
  list-style-type: none;
  margin-top: 32px;
  padding: 0;
  width: 100%;
`;

const SidebarItem = styled.li`
  margin: 16px 0;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isSidebarOpen ? "flex-start" : "center"};

  a {
    color: ${({ theme }) => theme.text};
  }

  a:hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    margin-left: ${(props) => (props.isSidebarOpen ? "10px" : "0")};
  }
`;

const SubMenu = styled.ul`
  background-color: ${({ theme }) => theme.neutral};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 8px;
  margin-top: 8px;

  li {
    font-size: 16px;
    font-weight: normal;
    padding: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  li:hover {
    color: ${({ theme }) => theme.primary};
  }

  li a {
    color: ${({ theme }) => theme.text};
  }

  li a:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const DarkModeToggle = styled(SidebarItem)`
  user-select: none;
`;

const Sidebar = ({ user, onLogout, darkMode, toggleDarkMode }) => {
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
    <Container isSidebarOpen={isSidebarOpen}>
      <LogoContainer>
        <ToggleButton onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </ToggleButton>

        <Logo isSidebarOpen={isSidebarOpen}>AL Ryada University</Logo>
      </LogoContainer>

      <SidebarList>
        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> {isSidebarOpen && "الرئيسية"}
          </Link>
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <Link to="/chart-of-accounts">
            <FontAwesomeIcon icon={faBookOpen} />{" "}
            {isSidebarOpen && "شجرة الحسابات"}
          </Link>
        </SidebarItem>

        <SidebarItem onClick={toggleTreasuryMenu} isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faCashRegister} />{" "}
          {isSidebarOpen && "الخزينة والبنوك"}{" "}
          {isSidebarOpen && <FontAwesomeIcon icon={faCaretDown} />}
        </SidebarItem>

        {isSidebarOpen && isTreasuryOpen && (
          <SubMenu>
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
          </SubMenu>
        )}

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faChartBar} /> {isSidebarOpen && "الإيرادات"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faChartBar} /> {isSidebarOpen && "المصروفات"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faUserGraduate} /> {isSidebarOpen && "الطلاب"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faShoppingCart} />{" "}
          {isSidebarOpen && "المشتريات"}
        </SidebarItem>

        <SidebarItem
          onClick={toggleInventoryMenu}
          isSidebarOpen={isSidebarOpen}
        >
          <FontAwesomeIcon icon={faWarehouse} /> {isSidebarOpen && "المخزون"}{" "}
          {isSidebarOpen && <FontAwesomeIcon icon={faCaretDown} />}
        </SidebarItem>

        {isSidebarOpen && isInventoryOpen && (
          <SubMenu>
            <li>أصناف المخزون</li>
            <li>سجلات المخزون</li>
          </SubMenu>
        )}

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faTruck} /> {isSidebarOpen && "الموردين"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faTruck} /> {isSidebarOpen && "المقاولين"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faFileAlt} /> {isSidebarOpen && "التقارير"}
        </SidebarItem>

        <SidebarItem isSidebarOpen={isSidebarOpen}>
          <FontAwesomeIcon icon={faCogs} /> {isSidebarOpen && "الإعدادات"}
        </SidebarItem>

        <DarkModeToggle onClick={toggleDarkMode} isSidebarOpen={isSidebarOpen}>
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
          {isSidebarOpen && (darkMode ? "الوضع العادي" : "الوضع المظلم")}
        </DarkModeToggle>

        {user && (
          <SidebarItem onClick={handleLogout} isSidebarOpen={isSidebarOpen}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isSidebarOpen && "تسجيل الخروج"}
          </SidebarItem>
        )}
      </SidebarList>
    </Container>
  );
};

export default Sidebar;
