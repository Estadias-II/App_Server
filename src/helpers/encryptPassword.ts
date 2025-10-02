import bcrypt from 'bcrypt';
import { UserModel } from '../models';

export const encryptPassword = async (UserPassword: UserModel['UserPassword']): Promise<string> => {
    return await bcrypt.hash(UserPassword, 10);
}