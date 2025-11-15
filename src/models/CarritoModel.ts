import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UsuarioModel } from './UsuarioModel';

@Table({
    tableName: "carritos"
})
export class CarritoModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_carrito"
    })
    declare idCarrito: number;

    @ForeignKey(() => UsuarioModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_usuario"
    })
    declare idUsuario: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_carta"
    })
    declare idCarta: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "nombre_carta"
    })
    declare nombreCarta: number;

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
        field: "img_carta"
    })
    declare imgCarta: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "precio_carta"
    })
    declare precioCarta: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "cantidad_carta"
    })
    declare cantidadCarta: number;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: "estado"
    })
    declare estado: string;

    @BelongsTo(() => UsuarioModel)
    declare usuario: UsuarioModel;
}