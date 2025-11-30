// backend/models/UsuarioModel.ts (actualizado)
import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "Usuarios"
})
export class UsuarioModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_usuario"
    })
    declare idUsuario: number;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: "nombres"
    })
    declare nombres: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: "apellidos"
    })
    declare apellidos: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "fecha_nacimiento"
    })
    declare fechaNacimiento: Date;

    @Column({
        type: DataType.STRING(250),
        unique: true,
        allowNull: false,
        field: "correo"
    })
    declare correo: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "pais"
    })
    declare pais: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "ciudad"
    })
    declare ciudad: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        field: "codigo_postal"
    })
    declare codigoPostal: string;

    @Column({
        type: DataType.STRING(250),
        unique: true,
        allowNull: false,
        field: "usuario"
    })
    declare usuario: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: "contraseña"
    })
    declare contraseña: string;

    // NUEVO CAMPO: Rol del usuario
    @Default('user')
    @Column({
        type: DataType.ENUM('user', 'admin', 'superadmin'),
        allowNull: false,
        field: "rol"
    })
    declare rol: string;
}