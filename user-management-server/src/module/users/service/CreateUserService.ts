import { PrismaClient } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';


const prisma = new PrismaClient();

interface User {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: User) {
        const userExists = await prisma.user.findFirst({ where: { email } });
        
        if (userExists) {
            throw new AppError('Email adress already used.', 500);
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });

    return user;
    }
}

export default CreateUserService;