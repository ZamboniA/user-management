import { Request, Response } from "express";
import UploadUserAvatarSessionService from "../service/UploadUserAvatarSessionService";


export default class UserAvatarUploadController {
    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.user as { id: string };
            const { file } = req;

            if (!file) {
                throw new Error('No file provided.');
            }

            const { filename: avatar } = file;

            const updateAvatar = new UploadUserAvatarSessionService();

            const user = await updateAvatar.execute({
                id,
                avatar,
            });

            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}