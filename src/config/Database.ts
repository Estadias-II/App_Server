import dotenv from 'dotenv';
import colors from 'colors';
import { Sequelize } from 'sequelize-typescript';

export class Database {
    private DB_HOST:        string;
    private DB_NAME:        string;
    private DB_USER:        string;
    private DB_PASSWORD:    string;
    private DB_PORT:        number;

    constructor() {
        dotenv.config();

        this.DB_HOST        = process.env.DB_HOST!;
        this.DB_NAME        = process.env.DB_NAME!;
        this.DB_USER        = process.env.DB_USER!;
        this.DB_PASSWORD    = process.env.DB_PASSWORD!;
        this.DB_PORT        = +process.env.DB_PORT!;
    }

    public async connectDatabase() {
        try {
            const sequelize = new Sequelize(this.DB_NAME, this.DB_USER, this.DB_PASSWORD,
                {
                    dialect: "mysql",
                    port: this.DB_PORT,
                    host: this.DB_HOST,
                }
            )

            await sequelize.sync();
            await sequelize.authenticate();

            console.log(colors.green.italic.bold("Base de datos conectada exitosamente!"));

        } catch (error) {
            console.log(colors.red.italic.bold(`Error al conectar la base de datos: ${error}`));
        }
    }
}