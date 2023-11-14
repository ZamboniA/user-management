import { PrismaClient } from "@prisma/client";
import AppError from "../../../shared/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

interface ITokens {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: ITokens): Promise<void> {
        const userToken = await prisma.user_Tokens.findFirst({
            where: {
                token,
            },
        });

        if (!userToken) {
            throw new AppError('User token does not exist.');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userToken.user_id,
            },
        });

        if (!user) {
            throw new AppError('User does not exist.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        const hashedPassword = await hash(password, 8);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
    }
}

export default ResetPasswordService;
