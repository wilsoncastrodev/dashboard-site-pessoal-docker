import "./bootstrap/logging.config.js";
import "./bootstrap/db.config.js";
import "./bootstrap/validation.config.js";
import routeConfig from "./bootstrap/routes.config.js";
import winston from "winston";
import express from "express";
import helmet from "helmet";

const app = express();
app.use(helmet());
routeConfig(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    winston.info(`Servidor executando na porta: ${PORT}`);
});