import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import { verifyRequestErrors } from "../middlewares";

export const router = Router();
const userController = new UserController();

router.post('/register-customer', [
    body('UserEmail')
        .notEmpty().withMessage("El campo UserEmail es obligatorio")
        .isEmail().withMessage("El email introducido no es válido")
        .normalizeEmail(),
    body("UserPassword")
        .notEmpty().withMessage("El campo UserPassword es obligatorio"),
    body("UserConfirmPassword")
        .notEmpty().withMessage("El campo UserConfirmPassword es obligatorio")
], 
    verifyRequestErrors,
    userController.registerCustomer.bind(userController)
)