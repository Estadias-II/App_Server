import { UserRepository } from '../repositories/UserRepository';
import { Response } from 'express';
import { RegisterCustomerProps, VerifyPasswordIsValidProps, VerifyPasswordsAreSameProps } from '../types/user/UserTypes';

export class UserService {
    private readonly userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }

    public async registerCustomer(registerCustomerProps: RegisterCustomerProps, res: Response) {
        const { UserPassword, UserEmail, UserConfirmPassword } = registerCustomerProps;

        this.verifyPasswordIsValid({UserPassword}, res);
        this.verifyPasswordsAreSame({UserPassword, UserConfirmPassword}, res);

        const user = await this.userRepository.findByEmail(UserEmail);
        if (user) return res.status(409).send({error: 'El email ya está siendo utilizado por otra persona!'});

        await this.userRepository.save({UserEmail, UserPassword});
    }

    private verifyPasswordIsValid(verifyPasswordIsValidProps: VerifyPasswordIsValidProps, res: Response) {
        const { UserPassword } = verifyPasswordIsValidProps;
        if (UserPassword.length < 8) return res.status(409).json({error: 'El password debe ser mayor de 8 caractéres'});
    }

    private verifyPasswordsAreSame(verifyPasswordsAreSameProps: VerifyPasswordsAreSameProps, res: Response) {
        const { UserPassword, UserConfirmPassword } = verifyPasswordsAreSameProps;
        if (UserPassword !== UserConfirmPassword) return res.status(409).send({error: 'Los passwords no son iguales'});
    }
}