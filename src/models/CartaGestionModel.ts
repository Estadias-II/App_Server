// backend/models/CartaGestionModel.ts - ACTUALIZADO
import { Table, Column, Model, DataType, Default, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: "cartas_gestion",
    timestamps: true
})
export class CartaGestionModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_gestion"
    })
    declare idGestion: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "id_carta_scryfall",
        unique: true,
    })
    declare idCartaScryfall: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
        field: "nombre_carta"
    })
    declare nombreCarta: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        field: "activa_venta"
    })
    declare activaVenta: boolean;

    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "stock_local"
    })
    declare stockLocal: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "precio_personalizado"
    })
    declare precioPersonalizado: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "precio_scryfall"
    })
    declare precioScryfall: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: "categoria_personalizada"
    })
    declare categoriaPersonalizada: string;

    @Default('normal')
    @Column({
        type: DataType.ENUM('bajo', 'medio', 'normal'),
        allowNull: false,
        field: "estado_stock"
    })
    declare estadoStock: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: "created_at"
    })
    declare createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: "updated_at"
    })
    declare updatedAt: Date;
}