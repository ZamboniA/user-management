import { Router } from "express";
import usersRouter from "../../../../module/users/routes/users.routes";


const routes = Router();

routes.use('/users', usersRouter);


export default routes;