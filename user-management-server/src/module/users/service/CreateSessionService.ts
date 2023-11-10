import { PrismaClient } from "@prisma/client";
import AppError from "../../../shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '../../../config/auth';

const prisma = new PrismaClient();


interface User{
    email: string
    password: string
}

class CreateSessionService{
    public async execute({ email, password }: User){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })


        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        return{
            user,
            token
        }
    }
}


export default CreateSessionService;