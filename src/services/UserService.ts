import { Response } from 'express';
import { LoginCustomerProps, RegisterCustomerProps, VerifyPasswordIsValidProps, VerifyPasswordsAreSameProps } from '../types/user/UserTypes';
import { comparePasswords, encryptPassword } from '../helpers';
import { UserRoleRepository, UserRepository } from '../repositories';

export class UserService {
    private readonly userRepository: UserRepository;
    private readonly userRoleRepository: UserRoleRepository;

    public constructor() {
        this.userRepository = new UserRepository();
        this.userRoleRepository = new UserRoleRepository();
    }

    public async registerCustomer(registerCustomerProps: RegisterCustomerProps, res: Response) {
        const { UserPassword, UserEmail, UserConfirmPassword } = registerCustomerProps;

        this.verifyPasswordIsValid({UserPassword}, res);
        this.verifyPasswordsAreSame({UserPassword, UserConfirmPassword}, res);

        const user = await this.userRepository.findByEmail(UserEmail);
        if (user) return res.status(409).send({error: 'El email ya está siendo utilizado por otra persona!'});

        const userRoleModel = await this.userRoleRepository.getRoleByName({UserRoleName: 'Customer'});
        if (!userRoleModel) return res.status(409).send({error: 'El rol para el cliente no es válido!'});

        const { UserRoleId } = userRoleModel;
        const encryptedPassword = await encryptPassword(UserPassword)
        
        await this.userRepository.save({UserEmail, UserPassword: encryptedPassword, UserRoleId});
    }

    public async loginCustomer(loginCustomerProps: LoginCustomerProps, res: Response) {
        const { UserEmail, UserPassword } = loginCustomerProps;

        const user = await this.userRepository.findByEmail(UserEmail);
        if (!user) return res.status(404).send({error: 'No se encontró ningun usuario con el email dado!'});

        const compareResult = await comparePasswords({EncryptedPassword: user.UserPassword, RequestPassword: UserPassword});
        if (!compareResult) return res.status(409).send({error: "El password es incorrecto!"});
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