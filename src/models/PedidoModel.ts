import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { UsuarioModel } from './UsuarioModel';
import { PedidoItemModel } from "./PedidoItemModel";

@Table({
    tableName: "pedidos"
})
export class PedidoModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_pedido"
    })
    declare idPedido: number;

    @ForeignKey(() => UsuarioModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_usuario"
    })
    declare idUsuario: number;

    @Column({
        type: DataType.STRING(50),
        unique: true,
        allowNull: false,
        field: "numero_pedido"
    })
    declare numeroPedido: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        field: "total"
    })
    declare total: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "total_items"
    })
    declare totalItems: number;

    @Column({
        type: DataType.ENUM('pendiente', 'confirmado', 'en_proceso', 'completado', 'cancelado'),
        defaultValue: 'pendiente',
        field: "estado"
    })
    declare estado: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "notas"
    })
    declare notas: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: "archivo_ticket"
    })
    declare archivoTicket: string;

    @BelongsTo(() => UsuarioModel)
    declare usuario: UsuarioModel;

    @HasMany(() => PedidoItemModel)
    declare items: PedidoItemModel[];
}