import mysql from "mysql2";
import config from "../config/index.js";

const connection = mysql.createPool(config.mysql);

export default connection;