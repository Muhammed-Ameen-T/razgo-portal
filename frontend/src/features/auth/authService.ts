/**
 * Authentication Service
 * Handles all auth-related API calls
 */

import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types';

// Mock data for demonstration (in production, use actual API)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'seeker@razgo.com': {
    id: '1',
    email: 'seeker@razgo.com',
    firstName: 'John',
    lastName: 'Seeker',
    role: 'seeker',
    password: 'password123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'employer@razgo.com': {
    id: '2',
    email: 'employer@razgo.com',
    firstName: 'Sarah',
    lastName: 'Employer',
    role: 'employer',
    password: 'password123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'admin@razgo.com': {
    id: '3',
    email: 'admin@razgo.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    password: 'password123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate mock JWT tokens
 */
const generateTokens = () => ({
  accessToken: `mock_access_${Date.now()}_${Math.random().toString(36).substr(2)}`,
  refreshToken: `mock_refresh_${Date.now()}_${Math.random().toString(36).substr(2)}`,
});

/**
 * Authentication service with all auth-related API methods
 */
export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simulate network delay

    const user = MOCK_USERS[credentials.email];
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const tokens = generateTokens();
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay

    // Check if user already exists
    if (MOCK_USERS[credentials.email]) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      role: credentials.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in mock database
    MOCK_USERS[credentials.email] = {
      ...newUser,
      password: credentials.password,
    };

    const tokens = generateTokens();

    return {
      user: newUser,
      ...tokens,
    };
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    await delay(300);
    
    // In production, this would validate the token and return user data
    // For now, return a mock user
    const storedState = localStorage.getItem('razgo_state');
    if (storedState) {
      const parsed = JSON.parse(storedState);
      if (parsed.auth?.user) {
        return parsed.auth.user;
      }
    }
    
    throw new Error('Not authenticated');
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('razgo_state');
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await delay(500);
    
    if (!MOCK_USERS[email]) {
      // Don't reveal if email exists
      return;
    }
    
    console.log(`Password reset email sent to ${email}`);
  },
};

export default authService;
