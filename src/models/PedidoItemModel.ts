import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PedidoModel } from './PedidoModel';

@Table({
    tableName: "pedido_items"
})
export class PedidoItemModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_item"
    })
    declare idItem: number;

    @ForeignKey(() => PedidoModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_pedido"
    })
    declare idPedido: number;

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
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        field: "precio_unitario"
    })
    declare precioUnitario: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "cantidad"
    })
    declare cantidad: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        field: "subtotal"
    })
    declare subtotal: number;

    @BelongsTo(() => PedidoModel)
    declare pedido: PedidoModel;
}