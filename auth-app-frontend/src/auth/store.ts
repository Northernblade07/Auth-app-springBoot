import type LoginData from '@/models/LoginData';
import type LoginResponseData from '@/models/LoginResponseData';
import type User from '@/models/User';
import {
  loginUser,
  logout as logoutApi,
} from '@/services/AuthService';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const LOCAL_KEY = 'auth_state';

type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;

  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => Promise<void>;
  checkLogin: () => boolean;

  changeLocalLoginData:(accessToken:string , user:User , authStatus:boolean )=>void
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const response = await loginUser(loginData);

          set({
            accessToken: response.accessToken,
            user: response.user,
            authStatus: true,
          });

          return response;
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        } finally {
          set({ authLoading: false });
        }
      },

      logout: async (silent = false) => {
        set({ authLoading: true });

        try {
          if (!silent) {
            await logoutApi();
          }
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      checkLogin: () => {
        const { accessToken, authStatus } = get();
        return Boolean(accessToken && authStatus);
      },
       changeLocalLoginData:(accessToken,user , authStatus)=>{
        set({
          accessToken,
          user,
          authStatus,
          
        });
      }
    }),
    {
      name: LOCAL_KEY,

      // Only persist stable auth data
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        authStatus: state.authStatus,
      }),

      // Restore auth state safely on refresh
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          state.authStatus = true;
        }
      },
    }
  )
);

export default useAuth;
