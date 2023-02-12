import app from "./app";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { PORT, DEV_PORT } from "./constants";
import * as dotenv from "dotenv";
import { Utils } from "./core/utils";
import * as getPort from "get-port";
/**
 *  ======= FUNCTION DECLARATION ===========
 */
 
dotenv.config();
const httpsOptions = {
    key: fs.readFileSync("./config/localhost.key"),
    cert: fs.readFileSync("./config/localhost.crt")
};
 
const onHttpError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof DEV_PORT === "string" ? "Pipe " + DEV_PORT : "Port " + DEV_PORT;
    switch (error.code) {
        case "EACCES":
            Utils.logger("error", `PILINK API [onHttpError]: `, `${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            Utils.logger("error", `PILINK API [onHttpError]: `, `${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};
 
const onHttpsError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
        case "EACCES":
            Utils.logger("error", `PILINK API [onHttpsError]: `, `${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            Utils.logger("error", `PILINK API [onHttpsError]: `, `${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};
 
const normalizePort = (val: number | string | boolean): number | string | boolean => {
    const port: number = typeof val === "string" ? parseInt(val, 10) : (typeof val === "boolean" ? null : val);
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return 3000;
    }
};
 
/**
 *  ======= SERVER LISTENING CONFIGURATION ===========
 * APPLICATION BEGINS HERE
 */
 
// Check First if port is available before Opening it
getPort({ port: Number(normalizePort(DEV_PORT)) }).then((httpPort) => {
    http.createServer(app).listen(httpPort, () => {
        Utils.logger("log", `Express HTTP server listening on port ${httpPort}.`);
    }).on("error", onHttpError);
});
 
getPort({ port: Number(normalizePort(PORT)) }).then((httpsPort) => {
    https.createServer(httpsOptions, app).listen(httpsPort, () => {
        Utils.logger("log", `Express HTTPS server listening on port ${httpsPort}.`);
    }).on("error", onHttpsError);
});