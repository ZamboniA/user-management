import { Router } from "express";
import ResetPasswordController from "../controller/ResetPasswordController";
import ForgotPasswordController from "../controller/ForgotPasswordController";



const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
    '/forgot',
    forgotPasswordController.create
)

passwordRouter.post(
    '/reset',
    resetPasswordController.create
);


export default passwordRouter;