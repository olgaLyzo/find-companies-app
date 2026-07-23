import React from "react";
import css from "../scss/components_styles/account.module.scss";
import { useAuth } from "../context/AuthContext";

const AccountBlock: React.FC = () => {
  const { auth, logout } = useAuth();
const fullName = auth.name || "Пользователь";  
const avatar = auth.avatarUrl || "/images/default_avatar.svg";
  return (
    <div className={css.account_container}>
      <div className={css.account_info}>
        <div className={css.user_name}>
          {fullName}
        </div>
        <button className={css.logout_btn} onClick={logout}>Выйти</button>
      </div>
      <img 
				src={avatar} 
				alt="user_avatar" 
				className={css.user_avatar} 
			/>
    </div>
  );
};

export default AccountBlock;