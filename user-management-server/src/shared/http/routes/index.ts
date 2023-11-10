import { Router } from "express";
import usersRouter from "../../../module/users/routes/users.routes";
import sessionRouter from "../../../module/users/routes/sessions.routes";


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);



export default routes;