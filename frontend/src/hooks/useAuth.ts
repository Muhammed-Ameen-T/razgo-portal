/**
 * Custom hook for authentication state and actions
 * Provides a clean interface for auth-related operations
 */

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, register, logout, clearError, checkAuth } from '@/features/auth/authSlice';
import type { LoginCredentials, RegisterCredentials, UserRole } from '@/types';

/**
 * Hook providing authentication state and methods
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  /**
   * Login user with credentials
   */
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(login(credentials));
      if (login.fulfilled.match(result)) {
        const role = result.payload.user.role;
        navigateByRole(role);
        return true;
      }
      return false;
    },
    [dispatch]
  );

  /**
   * Register new user
   */
  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      const result = await dispatch(register(credentials));
      if (register.fulfilled.match(result)) {
        const role = result.payload.user.role;
        navigateByRole(role);
        return true;
      }
      return false;
    },
    [dispatch]
  );

  /**
   * Navigate user based on their role
   */
  const navigateByRole = useCallback((role: UserRole) => {
    switch (role) {
      case 'employer':
        navigate('/employer/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'seeker':
      default:
        navigate('/jobs');
        break;
    }
  }, [navigate]);

  /**
   * Logout user and redirect to home
   */
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  /**
   * Clear authentication error
   */
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!user) return false;
      if (Array.isArray(role)) {
        return role.includes(user.role);
      }
      return user.role === role;
    },
    [user]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
    hasRole,
    navigateByRole,
  };
};

export default useAuth;
