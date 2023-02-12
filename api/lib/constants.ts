import * as dotenv from "dotenv";
 
dotenv.config();
// Get absolute path of the config folder
export const BASE_URI: string = process.env.API_BASE || `/v1`;
export const CONFIG_PATH: string = require("path").resolve(__dirname, "config/");
export const FILE_PATH: string = require("path").resolve(__dirname, "../static");
export const PUBLIC_FILE_PATH: string = require("path").resolve(__dirname, "../public/fichier");
export const TEMPLATE_PATH: string = require("path").resolve(__dirname, "core/email-template");
export const PORT = normalizePort(3000);
export const DEV_IP = "87.106.192.34";
export const PROD_IP = "217.160.44.197";
export const RECETTE_IP = "87.106.127.124";
export const DEV_PORT = normalizePort(process.env.HTTP_PORT || 8080);
export const DATABASE_ERR = `Database error`;
export const NOT_ALLOWED_ERR = `Unauthorized`;
export const INTERNAL_ERR = `Internal Server Error`;
export const FORBIDDEN_ERR = `Forbidden`;
export const INVALID_CREDENTIAL_API_ERR = `Invalid credential for this API`;
export const BAD_REQUEST_ERR = `Bad Request`;
export const PRECONDITION_ERR = `Precondition Failed`;
export const COMPANY_NOT_ALLOWED_ERR = `ERROR-COMPANY-NOT-ALLOWED-TO-SEND-MAIL`;
export const AVIS_MAIL_TITLE = `Votre avis compte !`;
 
let webUri = ``;
export const WEB_URI = webUri;
 
function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}