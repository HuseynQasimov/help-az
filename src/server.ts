import express from "express";
import config from "config";
import cors from "cors";
import { PgInitialize } from "./integrations/postgresql";
import bodyParser from "body-parser";
import nurseRouter from "./routes/nurse.route";
import serviceRouter from "./routes/service.route";
import promoCodeRouter from "./routes/promo-code.route";
import appointmentRouter from "./routes/appointment.route";
import { init } from "./services/socket/socket";

function main() {
    const app = express();
    app.use(bodyParser.json());

    const port = config.get("port");

    PgInitialize;

    app.use(cors({ origin: "*" }));

    app.use("/api/nurse", nurseRouter);
    app.use("/api/service", serviceRouter);
    app.use("/api/promo-code", promoCodeRouter);
    app.use("/api/appointment", appointmentRouter);

    app.use("/", (req, res) => {
        res.status(404).json("API not found");
    });

    const server = app.listen(port, () => {
        console.log(`Listening port ${port}..`);
    });

    init(server);
}

main();
