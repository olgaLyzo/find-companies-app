
export interface AuthState {
  accessToken: string | null;
  expire: string | null;
  name: string | null;
  surname: string | null;
  avatarUrl: string | null;
}

export interface AuthContextValue {
  auth: AuthState;

  login: (
    accessToken: string,
    expire: string,
    name: string | null,
    surname: string | null,
    avatarUrl: string | null
  ) => void;

  logout: () => Promise<void>;

  isAuthenticated: boolean;

  loadUserInfo: () => Promise<void>;
}

// export const isAuthenticated = () => {
//   const token = localStorage.getItem('accessToken');
//   const expire = localStorage.getItem('tokenExpire');

//   if (!token || !expire) return false;
//   return new Date(expire) > new Date();
// };