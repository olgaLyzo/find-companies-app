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
  logout: () => void;
  isAuthenticated: boolean;
  loadUserInfo: () => Promise<void>;
}

