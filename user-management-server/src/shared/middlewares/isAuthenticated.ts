import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

declare global {
    namespace Express {
        interface Request {
        user?: {
            id: string;
        };
        }
    }
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret) as ITokenPayload;

        req.user = {
        id: decodedToken.sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token.');
    }
}