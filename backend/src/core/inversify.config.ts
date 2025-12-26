import { Container } from 'inversify';
import { TYPES } from './types';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { IUserRepository } from '../domain/interfaces/repositories/user.repository';
import { JwtService } from '../infrastructure/services/jwt.service';
import { LoginUserUseCase } from '../application/useCases/loginUser.useCase';
import { ILoginUserUseCase } from '../domain/interfaces/useCases/loginUser.interface';
import { RedisService } from '../infrastructure/services/redis.service';
import { SendOtpUseCase } from '../application/useCases/sendOtpUser.useCase';
import { ISendOtpUseCase } from '../domain/interfaces/useCases/sentOtpUser.interface';
import { IVerifyOtpUseCase } from '../domain/interfaces/useCases/verifyOtpUser.interface';
import { VerifyOtpUseCase } from '../application/useCases/verifyOtpUser.useCase';
import { IUserAuthController } from '../domain/interfaces/controllers/userAuth.controller.interface';
import { UserAuthController } from '../presentation/controller/userAuth.controller';
import { IImageController } from '../domain/interfaces/controllers/imageMng.controller.interface';
import { ImageController } from '../presentation/controller/imageMng.controller';
import { NodemailerService } from '../infrastructure/services/nodemailer.service';
import { OtpService } from '../infrastructure/services/otp.service';
import { IEmailService } from '../domain/interfaces/services/IEmailService';
import { ICacheService } from '../domain/interfaces/services/ICacheService';
import { RoadmapRepository } from '../infrastructure/repositories/roadmap.repository';
import { IRoadmapRepository } from '../domain/interfaces/repositories/roadmap.repository';
import { IOtpService } from '../domain/interfaces/services/IOtpService';
import { GoogleAuthService } from '../infrastructure/services/googleAuth.service';
import { GithubAuthService } from '../infrastructure/services/gitHubAuth.service';
import { IGithubAuthService, IGoogleAuthService } from '../domain/interfaces/services/ISocialLogin';
import { GithubLoginUseCase } from '../application/useCases/gitHubLogin.useCase';
import { GoogleLoginUseCase } from '../application/useCases/googleLogin.useCase';
import {
  IGithubLoginUseCase,
  IGoogleLoginUseCase,
} from '../domain/interfaces/useCases/socialLogin.interface';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IRoadmapRepository>(TYPES.RoadmapRepository).to(RoadmapRepository);

// Services
container.bind<JwtService>(TYPES.JwtService).to(JwtService);
container.bind<IEmailService>(TYPES.EmailService).to(NodemailerService);
container.bind<ICacheService>(TYPES.CacheService).to(RedisService);
container.bind<IOtpService>(TYPES.OtpService).to(OtpService);
container.bind<IGoogleAuthService>(TYPES.GoogleAuthService).to(GoogleAuthService);
container.bind<IGithubAuthService>(TYPES.GithubAuthService).to(GithubAuthService);

// UseCases
container.bind<ILoginUserUseCase>(TYPES.UserLoginUseCase).to(LoginUserUseCase);
container.bind<ISendOtpUseCase>(TYPES.SendOtpUseCase).to(SendOtpUseCase);
container.bind<IVerifyOtpUseCase>(TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase);
container.bind<IGoogleLoginUseCase>(TYPES.GoogleLoginUseCase).to(GoogleLoginUseCase);
container.bind<IGithubLoginUseCase>(TYPES.GithubLoginUseCase).to(GithubLoginUseCase);

// Controllers
container.bind<IUserAuthController>(TYPES.UserAuthController).to(UserAuthController);
container.bind<IImageController>(TYPES.ImageMngController).to(ImageController);

export { container };
