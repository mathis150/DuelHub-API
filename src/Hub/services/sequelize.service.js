import { Sequelize } from "sequelize"
import dotenv from 'dotenv'

dotenv.config()

export const dbHub = new Sequelize(
    process.env.SQLDATABASE_HUB,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {host: process.env.SQL_HOST, dialect: 'mysql'})

export const dbConv = new Sequelize(
    process.env.SQLDATABASE_CONV,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {host: process.env.SQL_HOST, dialect: 'mysql'})

export const dbWiki = new Sequelize(
    process.env.SQLDATABASE_WIKI,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {host: process.env.SQL_HOST, dialect: 'mysql'})