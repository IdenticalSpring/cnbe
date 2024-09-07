import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RESPONSE_MESSAGE = 'response-message';
export const ResponseMassage = (message: string) =>
    SetMetadata(RESPONSE_MESSAGE, message)