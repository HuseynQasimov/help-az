import { DataSource } from "typeorm";
import config from "config";

export const PgDataSource = new DataSource({
    type: "postgres",
    host: config.get("postgresql.host"),
    port: config.get("postgresql.port"),
    username: config.get("postgresql.username"),
    password: config.get("postgresql.password"),
    database: config.get("postgresql.database"),
    synchronize: true,
    entities: [__dirname + "\\..\\entities\\**\\*.ts", __dirname + "\\..\\entities\\**\\*.js"],
});

export const PgInitialize = PgDataSource.initialize()
    .then(() => {
        console.log("Connected to PostgreSQL..");
    })
    .catch((error) => console.log(error));
