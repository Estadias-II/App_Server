import { UserRoleModel } from "../models";

export class UserRoleRepository {
    public async getRoleByName(UserRoleName: UserRoleModel['UserRoleName']): Promise<UserRoleModel | null> {
        const userRole = await UserRoleModel.findOne({
            where: {
                UserRoleName
            }
        })

        return userRole;
    }
}