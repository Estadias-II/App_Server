import { UserRoleModel } from "../models";
import { GetRoleByNameProps } from "../types/user_role/UserRoleTypes";

export class UserRoleRepository {
    public async getRoleByName(getRoleByNameProps: GetRoleByNameProps): Promise<UserRoleModel | null> {
        const { UserRoleName } = getRoleByNameProps;
        
        const userRole = await UserRoleModel.findOne({
            where: {
                UserRoleName
            }
        })

        return userRole;
    }
}