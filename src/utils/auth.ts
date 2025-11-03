
export interface AuthState {
  accessToken: string | null;
  expire: string | null;
  name?: string;
  surname?: string;
  avatarUrl?: string;
}

export interface AuthContextValue {
  auth: AuthState;
  login: (accessToken: string, expire: string, name?: string, surname?: string, avatarUrl?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  const expire = localStorage.getItem('tokenExpire');

  if (!token || !expire) return false;
  return new Date(expire) > new Date();
};