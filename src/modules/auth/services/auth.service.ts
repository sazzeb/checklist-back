import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import verifyAppleToken from 'verify-apple-id-token';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { IAuthService } from 'src/modules/auth/interfaces/auth.service.interface';
import { AuthJwtAccessPayloadDto } from 'src/modules/auth/dtos/jwt/auth.jwt.access-payload.dto';
import { AuthJwtRefreshPayloadDto } from 'src/modules/auth/dtos/jwt/auth.jwt.refresh-payload.dto';
import {
    IAuthPassword,
    IAuthPasswordOptions,
} from 'src/modules/auth/interfaces/auth.interface';
import { AuthSocialApplePayloadDto } from 'src/modules/auth/dtos/social/auth.social.apple-payload.dto';
import { AuthSocialGooglePayloadDto } from 'src/modules/auth/dtos/social/auth.social.google-payload.dto';
import { ENUM_AUTH_LOGIN_FROM } from 'src/modules/auth/enums/auth.enum';
import { plainToInstance } from 'class-transformer';
import { IUserDoc } from 'src/modules/user/interfaces/user.interface';
import { AuthLoginResponseDto } from 'src/modules/auth/dtos/response/auth.login.response.dto';
import { Duration } from 'luxon';
import process from 'node:process';
import { HelperTimeConvertService } from '../../../common/helper/services/helper.time.convert.service';

const env = process.env;

@Injectable()
export class AuthService implements IAuthService {
    // jwt
    private readonly jwtAccessTokenSecretKey: string;
    private readonly jwtAccessTokenExpirationTime: number;

    private readonly jwtRefreshTokenSecretKey: string;
    private readonly jwtRefreshTokenExpirationTime: number;

    private readonly jwtPrefixAuthorization: string;
    private readonly jwtAudience: string;
    private readonly jwtIssuer: string;

    // password
    private readonly passwordExpiredIn: number;
    private readonly passwordExpiredTemporary: number;
    private readonly passwordSaltLength: number;

    private readonly passwordAttempt: boolean;
    private readonly passwordMaxAttempt: number;

    // apple
    private readonly appleClientId: string;
    private readonly appleSignInClientId: string;

    // google
    private readonly googleClient: OAuth2Client;

    constructor(
        private readonly helperHashService: HelperHashService,
        private readonly helperDateService: HelperDateService,
        private readonly helperStringService: HelperStringService,
        private readonly helperEncryptionService: HelperEncryptionService,
        private readonly configService: ConfigService
    ) {
        // jwt
        this.jwtAccessTokenSecretKey = this.configService.get<string>(
            'auth.jwt.accessToken.secretKey'
        );
        this.jwtAccessTokenExpirationTime = HelperTimeConvertService(
            env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
        );

        this.jwtRefreshTokenSecretKey = this.configService.get<string>(
            'auth.jwt.refreshToken.secretKey'
        );
        this.jwtRefreshTokenExpirationTime = HelperTimeConvertService(
            env.AUTH_JWT_REFRESH_TOKEN_EXPIRED
        );

        this.jwtPrefixAuthorization = this.configService.get<string>(
            'auth.jwt.prefixAuthorization'
        );
        this.jwtAudience = this.configService.get<string>('auth.jwt.audience');
        this.jwtIssuer = this.configService.get<string>('auth.jwt.issuer');

        // password
        this.passwordExpiredIn = HelperTimeConvertService(
            env.AUTH_JWT_PASSWORD_EXPIRED_IN
        );
        this.passwordExpiredTemporary = HelperTimeConvertService(
            env.AUTH_JWT_PASSWORD_EXPIRED_TEMPORARY
        );

        this.passwordSaltLength = this.configService.get<number>(
            'auth.password.saltLength'
        );

        this.passwordAttempt = this.configService.get<boolean>(
            'auth.password.attempt'
        );
        this.passwordMaxAttempt = this.configService.get<number>(
            'auth.password.maxAttempt'
        );

        // apple
        this.appleClientId = this.configService.get<string>(
            'auth.apple.clientId'
        );
        this.appleSignInClientId = this.configService.get<string>(
            'auth.apple.signInClientId'
        );

        // google
        this.googleClient = new OAuth2Client(
            this.configService.get<string>('auth.google.clientId'),
            this.configService.get<string>('auth.google.clientSecret')
        );
    }

    async createAccessToken(
        subject: string,
        payload: AuthJwtAccessPayloadDto
    ): Promise<string> {
        return this.helperEncryptionService.jwtEncrypt(
            { ...payload },
            {
                secretKey: this.jwtAccessTokenSecretKey,
                expiredIn: this.jwtAccessTokenExpirationTime,
                audience: this.jwtAudience,
                issuer: this.jwtIssuer,
                subject,
            }
        );
    }

    async validateAccessToken(
        subject: string,
        token: string
    ): Promise<boolean> {
        return this.helperEncryptionService.jwtVerify(token, {
            secretKey: this.jwtAccessTokenSecretKey,
            audience: this.jwtAudience,
            issuer: this.jwtIssuer,
            subject,
        });
    }

    async payloadAccessToken(token: string): Promise<AuthJwtAccessPayloadDto> {
        return this.helperEncryptionService.jwtDecrypt<AuthJwtAccessPayloadDto>(
            token
        );
    }

    async createRefreshToken(
        subject: string,
        payload: AuthJwtRefreshPayloadDto
    ): Promise<string> {
        return this.helperEncryptionService.jwtEncrypt(
            { ...payload },
            {
                secretKey: this.jwtRefreshTokenSecretKey,
                expiredIn: this.jwtRefreshTokenExpirationTime,
                audience: this.jwtAudience,
                issuer: this.jwtIssuer,
                subject,
            }
        );
    }

    async validateRefreshToken(
        subject: string,
        token: string
    ): Promise<boolean> {
        return this.helperEncryptionService.jwtVerify(token, {
            secretKey: this.jwtRefreshTokenSecretKey,
            audience: this.jwtAudience,
            issuer: this.jwtIssuer,
            subject,
        });
    }

    async payloadRefreshToken(
        token: string
    ): Promise<AuthJwtRefreshPayloadDto> {
        return this.helperEncryptionService.jwtDecrypt<AuthJwtRefreshPayloadDto>(
            token
        );
    }

    async validateUser(
        passwordString: string,
        passwordHash: string
    ): Promise<boolean> {
        return this.helperHashService.bcryptCompare(
            passwordString,
            passwordHash
        );
    }

    async createPayloadAccessToken(
        data: IUserDoc,
        session: string,
        loginDate: Date,
        loginFrom: ENUM_AUTH_LOGIN_FROM
    ): Promise<AuthJwtAccessPayloadDto> {
        const plainObject: any = data.toObject();

        return plainToInstance(AuthJwtAccessPayloadDto, {
            _id: plainObject._id,
            type: plainObject.role.type,
            role: plainObject.role._id,
            email: plainObject.email,
            permissions: plainObject.role.permissions,
            session,
            loginDate,
            loginFrom,
        });
    }

    async createPayloadRefreshToken({
        _id,
        session,
        loginFrom,
        loginDate,
    }: AuthJwtAccessPayloadDto): Promise<AuthJwtRefreshPayloadDto> {
        return {
            _id,
            session,
            loginFrom,
            loginDate,
        };
    }

    async createSalt(length: number): Promise<string> {
        return this.helperHashService.randomSalt(length);
    }

    async createPassword(
        password: string,
        options?: IAuthPasswordOptions
    ): Promise<IAuthPassword> {
        const salt: string = await this.createSalt(this.passwordSaltLength);

        const today = this.helperDateService.create();
        const passwordExpired: Date = this.helperDateService.forward(
            today,
            Duration.fromObject({
                seconds: options?.temporary
                    ? this.passwordExpiredTemporary
                    : this.passwordExpiredIn,
            })
        );
        const passwordCreated: Date = this.helperDateService.create();
        const passwordHash = this.helperHashService.bcrypt(password, salt);
        return {
            passwordHash,
            passwordExpired,
            passwordCreated,
            salt,
        };
    }

    async createPasswordRandom(): Promise<string> {
        return this.helperStringService.random(10);
    }

    async checkPasswordExpired(passwordExpired: Date): Promise<boolean> {
        const today: Date = this.helperDateService.create();
        const passwordExpiredConvert: Date =
            this.helperDateService.create(passwordExpired);

        return today > passwordExpiredConvert;
    }

    async createToken(
        user: IUserDoc,
        session: string
    ): Promise<AuthLoginResponseDto> {
        const loginDate = this.helperDateService.create();
        const roleType = user.role.type;

        const payloadAccessToken: AuthJwtAccessPayloadDto =
            await this.createPayloadAccessToken(
                user,
                session,
                loginDate,
                ENUM_AUTH_LOGIN_FROM.CREDENTIAL
            );
        const accessToken: string = await this.createAccessToken(
            user.email,
            payloadAccessToken
        );

        const payloadRefreshToken: AuthJwtRefreshPayloadDto =
            await this.createPayloadRefreshToken(payloadAccessToken);
        const refreshToken: string = await this.createRefreshToken(
            user.email,
            payloadRefreshToken
        );

        return {
            tokenType: this.jwtPrefixAuthorization,
            roleType,
            expiresIn: this.jwtAccessTokenExpirationTime,
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(
        user: IUserDoc,
        refreshTokenFromRequest: string
    ): Promise<AuthLoginResponseDto> {
        const roleType = user.role.type;

        const payloadRefreshToken =
            this.helperEncryptionService.jwtDecrypt<AuthJwtRefreshPayloadDto>(
                refreshTokenFromRequest
            );
        const payloadAccessToken: AuthJwtAccessPayloadDto =
            await this.createPayloadAccessToken(
                user,
                payloadRefreshToken.session,
                payloadRefreshToken.loginDate,
                payloadRefreshToken.loginFrom
            );
        const accessToken: string = await this.createAccessToken(
            user.email,
            payloadAccessToken
        );

        return {
            tokenType: this.jwtPrefixAuthorization,
            roleType,
            expiresIn: this.jwtAccessTokenExpirationTime,
            accessToken,
            refreshToken: refreshTokenFromRequest,
        };
    }

    async getPasswordAttempt(): Promise<boolean> {
        return this.passwordAttempt;
    }

    async getPasswordMaxAttempt(): Promise<number> {
        return this.passwordMaxAttempt;
    }

    async getTokenType(): Promise<string> {
        return this.jwtPrefixAuthorization;
    }

    async getAccessTokenExpirationTime(): Promise<number> {
        return this.jwtAccessTokenExpirationTime;
    }

    async getRefreshTokenExpirationTime(): Promise<number> {
        return this.jwtRefreshTokenExpirationTime;
    }

    async getIssuer(): Promise<string> {
        return this.jwtIssuer;
    }

    async getAudience(): Promise<string> {
        return this.jwtAudience;
    }

    async appleGetTokenInfo(
        idToken: string
    ): Promise<AuthSocialApplePayloadDto> {
        const payload = await verifyAppleToken({
            idToken,
            clientId: [this.appleClientId, this.appleSignInClientId],
        });

        return { email: payload.email };
    }

    async googleGetTokenInfo(
        idToken: string
    ): Promise<AuthSocialGooglePayloadDto> {
        const login: LoginTicket = await this.googleClient.verifyIdToken({
            idToken: idToken,
        });
        const payload = login.getPayload();

        return { email: payload.email };
    }
}
