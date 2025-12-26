/**
 * Core type definitions for RazGo Job Portal
 * All TypeScript interfaces and types are centralized here
 */

// ============================================
// User & Authentication Types
// ============================================

/** Supported user roles in the application */
export type UserRole = 'seeker' | 'employer' | 'admin';

/** User entity representing authenticated users */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

/** Login credentials payload */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Registration payload with role selection */
export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

/** Authentication response from API */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/** Auth state for Redux store */
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// Job Types
// ============================================

/** Job employment type options */
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';

/** Job experience level requirements */
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

/** Job posting status */
export type JobStatus = 'draft' | 'active' | 'paused' | 'closed';

/** Company information for job postings */
export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  size: string;
  description?: string;
  location: string;
}

/** Job posting entity */
export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  status: JobStatus;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/** Job creation/update payload */
export interface JobFormData {
  title: string;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

/** Job search/filter parameters */
export interface JobFilters {
  search?: string;
  location?: string;
  type?: JobType[];
  experienceLevel?: ExperienceLevel[];
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  datePosted?: 'today' | 'week' | 'month' | 'any';
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// ============================================
// Application Types
// ============================================

/** Application status tracking */
export type ApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'offered' | 'rejected' | 'withdrawn';

/** Job application entity */
export interface Application {
  id: string;
  jobId: string;
  job: Job;
  userId: string;
  user: User;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// UI State Types
// ============================================

/** UI slice state for Redux */
export interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
}

/** Notification entity */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ============================================
// API Response Types
// ============================================

/** Standard API error response */
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

/** Standard API success response */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
