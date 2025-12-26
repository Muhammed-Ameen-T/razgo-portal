import { Router } from 'express';
import { container } from '../../core/inversify.config';
import { IUserAuthController } from '../../domain/interfaces/controllers/userAuth.controller.interface';
import { TYPES } from '../../core/types';
import { validateRequest } from '../middlewares/validate.middleware';
import {
  SendOtpSchema,
  SocialLoginSchema,
  UserLoginSchema,
  VerifyOtpSchema,
} from '../validation/userAuth.validation';
import { verifyAccessToken } from '../middlewares/verifyToken.middleware';

const userAuthController = container.get<IUserAuthController>(TYPES.UserAuthController);

const router = Router();

router.post('/send-otp', (req, res, next) =>
  validateRequest(SendOtpSchema)(req, res, () => userAuthController.sendOtp(req, res, next)),
);

router.post('/verify-otp', (req, res, next) =>
  validateRequest(VerifyOtpSchema)(req, res, () => userAuthController.verifyOtp(req, res, next)),
);

router.post('/login', (req, res, next) =>
  validateRequest(UserLoginSchema)(req, res, () => userAuthController.login(req, res, next)),
);

router.post('/google', (req, res, next) =>
  validateRequest(SocialLoginSchema)(req, res, () => userAuthController.googleLogin(req, res, next)),
);

router.post('/github', (req, res, next) =>
  validateRequest(SocialLoginSchema)(req, res, () => userAuthController.githubLogin(req, res, next)),
);

router.post('/logout', verifyAccessToken, (req, res, next) => userAuthController.logout(req, res, next));

export default router;