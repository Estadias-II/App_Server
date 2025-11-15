import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "Ucategorias"
})
export class UCategoriaModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_categoria"
    })
    declare idCategoria: number;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: "categoria"
    })
    declare categoria: string;

    @Column({
        type: DataType.TEXT(),
        allowNull: true,
        field: "descripcion"
    })
    declare descripcion: string;
}