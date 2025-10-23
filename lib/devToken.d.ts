/**
 * Type definitions for dev tools
 */

export interface DevTools {
  login: () => Promise<boolean>;
  quickLogin: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  session: () => Promise<any>;
  user: () => Promise<any>;
  clear: () => void;
  credentials: {
    email: string;
    password: string;
    name: string;
  };
  help: () => void;
}

declare global {
  interface Window {
    devTools?: DevTools;
  }
}

export {};
