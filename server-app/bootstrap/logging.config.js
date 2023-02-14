import "express-async-errors";
import winston from "winston";

(() => {
    winston.addColors({
        error: "yellow",
        warn: "yellow",
        info: "white",
        success: "green",
    });

    const myFormat = winston.format.printf(info => {
        return (info.timestamp + " | " +
            info.message.split("\n")[0] + " | " +
                info.trace[0].file + ":" + info.trace[0].line
        );
    });

    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.colorize({
                all:true
            }),
            winston.format.timestamp(),
            myFormat
        ),
    });

    logger.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logger/simpleLog.log' }),
    );

    winston.exceptions.handle(
        new winston.transports.File({
            filename: "logger/exceptions.log",
         })
    );

    winston.add(
        new winston.transports.File({
            filename: "logger/error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            ),
        })
    );

    if (process.env.NODE_ENV === "local") {
        winston.add(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                ),
            })
        );
    }
})();
