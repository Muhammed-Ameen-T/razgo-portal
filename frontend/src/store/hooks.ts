/**
 * Typed Redux hooks for use throughout the application
 * These ensure proper typing with TypeScript
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/** Typed dispatch hook */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed selector hook */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
