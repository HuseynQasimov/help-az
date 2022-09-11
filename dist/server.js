"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const postgresql_1 = require("./integrations/postgresql");
const body_parser_1 = __importDefault(require("body-parser"));
const nurse_route_1 = __importDefault(require("./routes/nurse.route"));
const service_route_1 = __importDefault(require("./routes/service.route"));
const promo_code_route_1 = __importDefault(require("./routes/promo-code.route"));
const appointment_route_1 = __importDefault(require("./routes/appointment.route"));
const socket_1 = require("./services/socket/socket");
function main() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const port = config_1.default.get("port");
    postgresql_1.PgInitialize;
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use(express_1.default.static(__dirname + "/public"));
    console.log(__dirname + "/public");
    app.use("/api/nurse", nurse_route_1.default);
    app.use("/api/service", service_route_1.default);
    app.use("/api/promo-code", promo_code_route_1.default);
    app.use("/api/appointment", appointment_route_1.default);
    app.use("/", (req, res) => {
        res.status(404).json("API not found");
    });
    const server = app.listen(port, () => {
        console.log(`Listening port ${port}..`);
    });
    (0, socket_1.init)(server);
}
main();
