import * as fs from "fs";
import * as path from "path";
import * as ip from "ip";
import { Sequelize, DataTypes } from "sequelize";
import { RECETTE_IP, CONFIG_PATH } from "../constants";
 
const DATABASE = JSON.parse(
  fs.readFileSync(`${CONFIG_PATH}/db/database.json`, "utf8")
).postgre;
 
let sequelize;
let host: string = process.env.DB_HOST || DATABASE.host;
let hostRecette: string = process.env.DB_HOST || DATABASE.host_recette;
let driver: string = process.env.DB_DRIVER || DATABASE.driver;
let port: number = process.env.DB_PORT || DATABASE.port;
let database: string = process.env.DB_NAME || DATABASE.database;
let username: string = process.env.DB_USER || DATABASE.username;
let password: string = process.env.DB_PASS || DATABASE.password;
 
let postgreURL = `${driver}://${username}:${password}@${host}:${port}/${database}`;
 
const basename = path.basename(__filename);
const db: any = {};
 
if (ip.address() === RECETTE_IP) {
 let postgreURL = `${driver}://${username}:${password}@${hostRecette}/${database}`;
}
 
sequelize = new Sequelize(postgreURL);
 
fs.readdirSync(__dirname).filter((file) => {
  let extension = ".js";
  if (process.env.NODE_ENV !== undefined) {
    extension = ".ts";
  }
  return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === `${extension}`);
}).forEach((file) => {
  const Models = require(path.join(__dirname, file.slice(0, -3)));
  const model = Models.default(sequelize, DataTypes);
  db[model.getClass()] = model;
});
 
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;