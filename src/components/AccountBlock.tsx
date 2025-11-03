import React from "react";
import css from "../scss/account.module.scss";
import { useAuth } from "../context/AuthContext";

const AccountBlock: React.FC = () => {
  const { auth, logout } = useAuth();
  return (
    <div className={css.account_container}>
      <div className={css.account_info}>
        <div className={css.user_name}>
          {auth.name || "Tim Huck"}
        </div>
        <button className={css.logout_btn} onClick={logout}>Выйти</button>
      </div>
      <img src={auth.avatarUrl || "/images/default_avatar.svg"} alt="user_avatar" className={css.user_avatar} />
    </div>
  );
};

export default AccountBlock;