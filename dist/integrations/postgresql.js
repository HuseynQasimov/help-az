"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgInitialize = exports.PgDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("config"));
exports.PgDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.default.get("postgresql.host"),
    port: config_1.default.get("postgresql.port"),
    username: config_1.default.get("postgresql.username"),
    password: config_1.default.get("postgresql.password"),
    database: config_1.default.get("postgresql.database"),
    synchronize: true,
    logging: true,
    entities: [__dirname + "\\..\\entities\\**\\*.ts", __dirname + "\\..\\entities\\**\\*.js"],
});
exports.PgInitialize = exports.PgDataSource.initialize()
    .then(() => {
    console.log("Connected to PostgreSQL..");
})
    .catch((error) => console.log(error));
