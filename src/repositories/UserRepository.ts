import { UserModel } from "../models";
import { SaveCustomerProps } from "../types/user/UserTypes";

export class UserRepository {
    public async save(saveCustomerProps: SaveCustomerProps) {
        const { UserEmail, UserPassword, UserRoleId } = saveCustomerProps;
        await UserModel.create({
            UserEmail,
            UserPassword,
            UserRole: UserRoleId
        })
    }

    public async findByEmail(UserEmail: UserModel['UserEmail']): Promise<UserModel | null> {
        const user = await UserModel.findOne({
            where: {
                UserEmail
            }
        });

        return user;
    }
}