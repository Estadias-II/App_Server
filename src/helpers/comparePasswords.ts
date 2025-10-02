import { ComparePasswordsProps } from "../types/user/UserTypes";
import bcrypt from 'bcrypt';

export const comparePasswords = async (comparePasswordsProps: ComparePasswordsProps) => {
    const { EncryptedPassword, RequestPassword } = comparePasswordsProps;
    return await bcrypt.compare(RequestPassword, EncryptedPassword);
}