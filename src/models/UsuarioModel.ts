import { Table, Column, Model, DataType, HasMany, Default } from "sequelize-typescript";
import { CarritoModel } from './CarritoModel';

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
        type: DataType.STRING(20),
        allowNull: false,
        defaultValue: 'user',
        field: "rol"
    })
    declare rol: string; // 'user', 'admin', 'superadmin'

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

    @HasMany(() => CarritoModel)
    declare carritos: CarritoModel[];
}