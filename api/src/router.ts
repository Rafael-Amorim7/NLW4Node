import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveysController } from './controller/SurveysController';


const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.create)

export { router };