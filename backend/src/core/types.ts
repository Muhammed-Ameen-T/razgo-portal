export const TYPES = {
  //Repositories
  UserRepository: Symbol.for('UserRepository'),
  RoadmapRepository: Symbol.for('RoadmapRepository'),

  //Services
  JwtService: Symbol.for('JwtService'),
  RedisService: Symbol.for('RedisService'),
  EmailService: Symbol.for('EmailService'),
  CacheService: Symbol.for('CacheService'),
  OtpService: Symbol.for('OtpService'),
  GoogleAuthService: Symbol.for('GoogleAuthService'),
  GithubAuthService: Symbol.for('GithubAuthService'),

  //Controllers
  UserAuthController: Symbol.for('UserAuthController'),
  ImageMngController: Symbol.for('ImageMngController'),

  //Use Cases
  UserLoginUseCase: Symbol.for('UserLoginUseCase'),
  SendOtpUseCase: Symbol.for('SendOtpUseCase'),
  VerifyOtpUseCase: Symbol.for('VerifyOtpUseCase'),
  BulkUploadImagesUseCase: Symbol.for('BulkUploadImagesUseCase'),
  DeleteImageUseCase: Symbol.for('DeleteImageUseCase'),
  ImageUseCase: Symbol.for('ImageUseCase'),
  FindUserImagesUseCase: Symbol.for('FindUserImagesUseCase'),
  EditImageUseCase: Symbol.for('EditImageUseCase'),
  ChangePasswordUseCase: Symbol.for('ChangePasswordUseCase'),
  ReorderImageUseCase: Symbol.for('ReorderImageUseCase'),
  GoogleLoginUseCase: Symbol.for('GoogleLoginUseCase'),
  GithubLoginUseCase: Symbol.for('GithubLoginUseCase'),
};
