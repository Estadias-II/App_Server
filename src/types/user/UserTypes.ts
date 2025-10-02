import { UserModel, UserRoleModel } from "../../models";

export type RegisterCustomerProps = {
    UserEmail: UserModel['UserEmail'];
    UserPassword: UserModel['UserPassword'];
    UserConfirmPassword: UserModel['UserPassword'];
}

export type VerifyPasswordIsValidProps = Pick<RegisterCustomerProps, 'UserPassword'>;
export type VerifyPasswordsAreSameProps = Pick<RegisterCustomerProps, 'UserPassword' | 'UserConfirmPassword'>;
export type SaveCustomerProps = Pick<RegisterCustomerProps, 'UserEmail' | 'UserPassword'> & {
    UserRoleId: UserRoleModel['UserRoleId']
};
export type LoginCustomerProps = Pick<RegisterCustomerProps, 'UserEmail' | 'UserPassword'>;
export type ComparePasswordsProps = {
    EncryptedPassword: UserModel['UserPassword'];
    RequestPassword: UserModel['UserPassword'];
}