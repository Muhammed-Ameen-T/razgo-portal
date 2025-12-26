/**
 * Redux Store Configuration
 * Centralizes all state management with persistence
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import uiReducer from '@/features/ui/uiSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('razgo_state');
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    return {
      auth: parsed.auth || undefined,
    };
  } catch (err) {
    console.error('Failed to load persisted state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      auth: {
        user: state.auth.user,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
        isAuthenticated: state.auth.isAuthenticated,
      },
    });
    localStorage.setItem('razgo_state', serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};

// Create store with preloaded state
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ['auth/setCredentials'],
      },
    }),
  devTools: import.meta.env.DEV,
});

// Subscribe to store changes and persist
store.subscribe(() => {
  saveState(store.getState());
});

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
