import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <p>
        الصفحة غير موجودة <br />
        <Link to="/">
          <b>العودة إلى الصفحة الرئيسية</b>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
