import { Router } from "express";
import { Auth } from "../middlewares/auth";
import multer from "multer";

import * as UserController from '../controllers/UserController'

const router = Router()

router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)

router.get('/users/list', Auth.private, UserController.listUsers)

export default router