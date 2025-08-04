import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log('authMiddleware-came-here');
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized - No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        if (!decoded || !decoded.id) {
            res.status(401).json({ message: 'Unauthorized - Invalid token' });
            return;
        }
        
        if (!req.user) {
            req.user = { id: decoded.id };
        } else {
            req.user.id = decoded.id;
        }

        console.log('authMiddleware-successful, user id:', decoded.id);
        next();
    } catch (error) {
        console.error('authMiddleware-error:', error);
        res.status(401).json({ message: 'Unauthorized - Token verification failed' });
        return;
    }
}

export default authMiddleware;