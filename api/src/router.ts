import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveysController } from './controller/SurveysController';
import { SendMailController } from './controller/SendMailController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/send", sendMailController.execute)

export { router };