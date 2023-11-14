import { Request, Response } from "express";
import ResetPasswordService from "../service/ResetPasswordService";

import ForgotPasswordService from "../service/ForgotPasswordService";

export default class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            const forgotPasswordEmail = new ForgotPasswordService()

            await forgotPasswordEmail.execute({
                email
            })

            return res.status(204).json();
        } catch (error) {
            console.error("error");
            return res.status(400).json({ error: "Failed to send reset password." });
        }
    }
}
