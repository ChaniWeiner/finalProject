import express from "express";
import registrationController from '../controllers/registrationController.js';

const regRouter = express.Router();

const reg = new registrationController();

regRouter.post("/volunteer/login", reg.login);
regRouter.post("/volunteer/register", reg.register);

export {
    regRouter
}
