import prismaClient from 'db';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await prismaClient.users.findUnique({
        where: {
            email,
        }
    })

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    res.json({ message: 'User created successfully', user });
});

authRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await prismaClient.users.findUnique({
            where: {
                email,
            }
        })


        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, user: existingUser });
    } catch (error) {
        console.error('login-error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


export default authRouter;