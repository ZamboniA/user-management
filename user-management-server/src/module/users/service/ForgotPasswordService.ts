import { PrismaClient } from "@prisma/client";
import AppError from "../../../shared/errors/AppError";

const prisma = new PrismaClient();

interface IRequest {
    email: string;
}

class ForgotPasswordService {
    public async execute({ email }: IRequest): Promise<void> {
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new AppError('User not found.');
        }

        const token = await prisma.user_Tokens.create({
            data: {
                user_id: user.id,
            },
        });

        console.log(token);
    }
}

export default ForgotPasswordService;
