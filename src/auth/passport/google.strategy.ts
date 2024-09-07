import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: '769954175129-mje8nl9sfm59rpcqavjdqjad267hjqk5.apps.googleusercontent.com',  
            clientSecret: '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',  
            callbackURL: 'http://localhost:8080/api/v1/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };

        const validatedUser = await this.authService.validateGoogleUser(user);
        done(null, validatedUser);
    }
}