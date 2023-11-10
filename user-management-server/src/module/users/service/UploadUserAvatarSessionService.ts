import { PrismaClient } from "@prisma/client";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from '../../../config/upload';
import fs from "fs/promises";

const prisma = new PrismaClient();

interface UserAvatar {
    id: string;
    avatar: string;
}

class UploadUserAvatarSessionService {
    public async execute({ id, avatar }: UserAvatar) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                throw new AppError('User not found.');
            }

            if (user.avatar) {
                const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
                const avatarFileExists = await fs.stat(avatarFilePath);

                if (avatarFileExists) {
                    await fs.unlink(avatarFilePath);
                }
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    avatar: avatar,
                },
            });

            return updateUser;
        } catch (error) {
            console.error(error);
            throw new AppError('Error updating user avatar.');
        }
    }
}

export default UploadUserAvatarSessionService;