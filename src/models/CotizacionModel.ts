import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UsuarioModel } from "./UsuarioModel";

@Table({
    tableName: "cotizaciones"
})
export class CotizacionModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_cotizacion"
    })
    declare idCotizacion: number;

    @ForeignKey(() => UsuarioModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_usuario"
    })
    declare idUsuario: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "id_carta_scryfall"
    })
    declare idCartaScryfall: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
        field: "nombre_carta"
    })
    declare nombreCarta: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "notas_cliente"
    })
    declare notasCliente: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "precio_cotizado"
    })
    declare precioCotizado: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "dias_entrega"
    })
    declare diasEntrega: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "notas_administrador"
    })
    declare notasAdministrador: string;

    @Column({
        type: DataType.ENUM('pendiente', 'cotizada', 'aceptada', 'rechazada', 'completada', 'cancelada'),
        defaultValue: 'pendiente',
        field: "estado"
    })
    declare estado: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "fecha_cotizacion"
    })
    declare fechaCotizacion: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "fecha_respuesta"
    })
    declare fechaRespuesta: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "fecha_completada"
    })
    declare fechaCompletada: Date;

    @BelongsTo(() => UsuarioModel)
    declare usuario: UsuarioModel;
}