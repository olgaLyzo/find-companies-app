import { createContext } from 'react';
import type { AuthContextValue } from '../utils/auth';

export const AuthContext = createContext<AuthContextValue | null>(null);