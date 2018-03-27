import * as devSettings from "./devSettings";

export const MYSQL_HOST: string = process.env.MYSQL_HOST || devSettings.MYSQL_HOST;
export const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || devSettings.MYSQL_PASSWORD;
export const MYSQL_USER: string = process.env.MYSQL_USER || devSettings.MYSQL_USER;
