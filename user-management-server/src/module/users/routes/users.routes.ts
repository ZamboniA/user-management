import { Router } from "express";
import UsersController from "../controller/UserController";
import multer from "multer";
import uploadConfig from '../../../config/upload';
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import UserAvatarUploadController from "../controller/UploadUserAvatarController";

const usersRouter = Router();

const upload = multer(uploadConfig);

const usersController = new UsersController();
const avatarUploadController = new UserAvatarUploadController();

usersRouter.get('/:id',
    usersController.index
)
usersRouter.get('/',
    usersController.index
)
usersRouter.post(
    '/',
    usersController.create
)

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    avatarUploadController.update
);

export default usersRouter;