import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
    private readonly userService: UserService;

    public constructor() {
        this.userService = new UserService();
    }

    public async registerCustomer(req: Request, res: Response): Promise<void> {
        const { UserEmail, UserPassword, UserConfirmPassword } = req.body;
        
        await this.userService.registerCustomer({
            UserEmail,
            UserPassword,
            UserConfirmPassword
        }, res)

        res.status(201).json({message: 'Tu cuenta ha sido creada exitosamente!'});
    }

    public async loginCustomer(req: Request, res: Response): Promise<void> {
        const { UserEmail, UserPassword } = req.body;

        await this.userService.loginCustomer({
            UserEmail,
            UserPassword
        }, res);

        res.send("Correcto");
    }
}