import { Table, Column, DataType, Default, Model, BelongsTo, HasOne } from "sequelize-typescript";
import { UserModel } from './UserModel';

@Table({
    tableName: "UserRole"
})

export class UserRoleModel extends Model {
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID(),
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    declare UserRoleId: string;

    @Column({
        type: DataType.STRING(20),
        unique: true,
        allowNull: false,
    })
    declare UserRoleName: string;

    @HasOne(() => UserModel)
    declare UserModel: UserModel;
}