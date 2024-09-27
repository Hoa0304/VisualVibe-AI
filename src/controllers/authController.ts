import { Request, Response } from 'express';
import { User } from '../types/auth.types';

const users: User[] = [];

export const signup = async (req: Request, res: Response) => {
    const newUser: User = req.body;

    if (!newUser.email || !newUser.password || !newUser.userName) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    users.push(newUser);
    return res.status(201).json({ success: true, user: newUser });
    
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json(user);
};

export const signout = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Successfully signed out' });
};
