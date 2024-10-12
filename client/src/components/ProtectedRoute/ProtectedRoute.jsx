import { Link, Navigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";

const ProtectedRoute = ({ user, children, requiredRole }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className={styles.notAuthorized}>
        <p className={styles.notAuthorizedMessage}>
          ليس لديك الصلاحية للدخول إلى هذه الصفحة.
          <br />
          <Link to="/">العودة إلي الصفحة الرئيسية</Link>
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
