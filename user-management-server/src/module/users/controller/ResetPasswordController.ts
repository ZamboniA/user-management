import { Request, Response } from "express";
import ResetPasswordService from "../service/ResetPasswordService";
import AppError from "../../../shared/errors/AppError";

export default class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { token, password } = req.body;


            if(!password){
                throw new AppError("Password are required.")
            }

            if(!token){
                throw new AppError("token are required.")
            }

            const resetPassword = new ResetPasswordService()

            await resetPassword.execute({
                token,
                password
            })

            return res.status(204).json();
        } catch (error) {
            console.error("Error in ResetPasswordController:", error);
            return res.status(400).json({ error: "Failed to reset password." });
        }
    }
}
