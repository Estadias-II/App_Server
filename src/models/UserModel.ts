import { Table, Column, Default, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserRoleModel } from './UserRoleModel';

@Table({
    tableName: "User"
})

export class UserModel extends Model {
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID(),
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    declare UserId: string;

    @Column({
        type: DataType.STRING(255),
        unique: true,
        allowNull: false,
    })
    declare UserEmail: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare UserPassword: string;

    @BelongsTo(() => UserRoleModel)
    declare UserRoleModel: UserRoleModel;

    @ForeignKey(() => UserRoleModel)
    @Column({
        type: DataType.UUID(),
        allowNull: false
    })
    declare UserRole: string;
}