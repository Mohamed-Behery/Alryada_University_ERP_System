import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faSignInAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/RST-logo.png";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "mohamed", password: "123", role: "user" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heading}>
        <img src={Logo} alt="Logo" />
        <h2>جامعة الريادة للعلوم والتكنولوجيا</h2>
      </div>
      <div className={styles.loginForm}>
        <h3>تسجيل الدخول</h3>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>
              <FontAwesomeIcon icon={faUser} />
              اسم المستخدم
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <FontAwesomeIcon icon={faLock} />
              كلمة المرور
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formControl}
              />
              <span
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.btn}>
            <FontAwesomeIcon icon={faSignInAlt} />
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
