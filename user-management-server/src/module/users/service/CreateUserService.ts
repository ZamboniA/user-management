import { PrismaClient } from '@prisma/client';

interface User{
    name: string
    email: string
    password: string
}

export default class CreateUserService{



    async execute({ name, email, password }: User) {

    }